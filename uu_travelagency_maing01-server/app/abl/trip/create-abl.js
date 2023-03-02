"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UuBinaryAbl } = require("uu_appg01_binarystore-cmd");
const Errors = require("../../api/errors/trip-error");
const Warnings = require("../../api/warnings/trip-warnings");
const InstanceChecker = require("../../component/instance-checker");
const Trip = require("../../component/trip");
const { Profiles, Schemas, Trips } = require("../constants");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.TRIP);
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("tripCreateDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const addedValues = {
      visibility: authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES),
      uuIdentity: session.getIdentity().getUuIdentity(),
      uuIdentityName: session.getIdentity().getName(),
    };

    const uuObject = {
      ...dtoIn,
      ...addedValues,
    };

    // hds 2
    const allowedStateRules = {
      [Profiles.AUTHORITIES]: new Set([Trips.States.ACTIVE, Trips.States.UNDER_CONSTRUCTION]),
      [Profiles.EXECUTIVES]: new Set([Trips.States.ACTIVE, Trips.States.UNDER_CONSTRUCTION]),
    };
    // 2.1, 2.1.1, 2.2, 2.2.1, 2.2.2
    await InstanceChecker.ensureInstanceAndState(
      awid,
      allowedStateRules,
      authorizationResult,
      Errors.Create,
      uuAppErrorMap
    );

    // hds 3, 3.1
    if ("text" in dtoIn && dtoIn.text.trim().length === 0 && !dtoIn.image) {
      throw new Errors.Create.InvalidText({ uuAppErrorMap }, { text: dtoIn.text });
    }

    // hds 4
    if (dtoIn.image) {
      // 4.1, 4.1.1
      const image = await Trip.checkAndGetImageAsStream(dtoIn.image, Errors.Create, uuAppErrorMap);

      try {
        // 4.2
        const binary = await UuBinaryAbl.createBinary(awid, {
          data: image,
          filename: dtoIn.image.filename,
          contentType: dtoIn.image.contentType,
        });
        uuObject.image = binary.code;
      } catch (e) {
        // 4.2.1
        throw new Errors.Create.UuBinaryCreateFailed({ uuAppErrorMap }, e);
      }
    }

    // hds 5
    if (dtoIn.locationIdList && dtoIn.locationIdList.length) {
      const { validLocations, invalidLocations } = await Trip.checkLocationsExistence(awid, dtoIn.locationIdList);
      // 5.1
      if (invalidLocations.length > 0) {
        ValidationHelper.addWarning(
          uuAppErrorMap,
          Warnings.Create.LocationDoesNotExist.code,
          Warnings.Create.LocationDoesNotExist.message,
          { locationIdList: invalidLocations }
        );
      }
      uuObject.locationIdList = validLocations;
    } else {
      uuObject.locationIdList = [];
    }

    // hds 6
    uuObject.awid = awid;
    let trip;

    try {
      trip = await this.dao.create(uuObject);
    } catch (e) {
      // 6.1
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TripDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 7
    const dtoOut = {
      ...trip,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new CreateAbl();
