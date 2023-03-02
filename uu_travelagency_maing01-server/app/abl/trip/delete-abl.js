"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UuBinaryAbl } = require("uu_appg01_binarystore-cmd");
const Errors = require("../../api/errors/trip-error");
const Warnings = require("../../api/warnings/trip-warnings");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Trips } = require("../constants");

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.TRIP);

  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("tripDeleteDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

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
      Errors.Delete,
      uuAppErrorMap
    );

    // hds 3
    const trip = await this.dao.get(awid, dtoIn.id);
    if (!trip) {
      // 3.1
      throw new Errors.Delete.TripDoesNotExist({ uuAppErrorMap }, { tripId: dtoIn.id });
    }

    // hds 4
    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    if (uuIdentity !== trip.uuIdentity && !isAuthorities) {
      // 4.1
      throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap });
    }

    // hds 5


    // hds 6
    if (trip.image) {
      try {
        await UuBinaryAbl.deleteBinary(awid, { code: trip.image });
      } catch (e) {
        // 6.1
        throw new Errors.Delete.UuBinaryDeleteFailed({ uuAppErrorMap }, e);
      }
    }

    // hds 7
    await this.dao.delete(awid, dtoIn.id);

    // hds 8
    return { uuAppErrorMap };
  }
}

module.exports = new DeleteAbl();
