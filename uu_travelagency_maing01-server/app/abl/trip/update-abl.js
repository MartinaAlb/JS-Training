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

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.TRIP);
  }

  async update(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("tripUpdateDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
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
      Errors.Update,
      uuAppErrorMap
    );

    // hds 3, 3.1
    if (dtoIn.image && dtoIn.deleteImage) {
      throw new Errors.Update.InvalidInputCombination({ uuAppErrorMap });
    }

    // hds 4
    const trip = await this.dao.get(awid, dtoIn.id);
    if (!trip) {
      // 4.1
      throw new Errors.Update.TripDoesNotExist({ uuAppErrorMap }, { tripId: dtoIn.id });
    }

    // hds 5
    const uuIdentity = session.getIdentity().getUuIdentity();
    const isAuthorities = authorizationResult.getAuthorizedProfiles().includes(Profiles.AUTHORITIES);
    if (uuIdentity !== trip.uuIdentity && !isAuthorities) {
      // 5.1
      throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
    }

    // hds 6
    const isEmptyText = "text" in dtoIn && dtoIn.text.trim().length === 0;
    // 6.1
    if (isEmptyText && !dtoIn.image && !trip.image) {
      // note: if trip doesn't have image it must have a text
      throw new Errors.Update.TextCannotBeRemoved(uuAppErrorMap, { text: dtoIn.text });
    }
    // 6.2
    if (dtoIn.deleteImage && trip.image && !trip.text && (isEmptyText || !dtoIn.text)) {
      throw new Errors.Update.ImageCannotBeDeleted(uuAppErrorMap);
    }

    // hds 7, 7.1
    const toUpdate = { ...dtoIn };
    delete toUpdate.deleteImage;
    // Note: empty array is valid (possibility to remove all locations)

    // todo
    if (dtoIn.locationIdList) {
      const { validLocations, invalidLocations } = await Trip.checkLocationsExistence(awid, dtoIn.locationIdList);
      if (invalidLocations.length > 0) {
        // 7.2
        ValidationHelper.addWarning(
          uuAppErrorMap,
          Warnings.Update.LocationDoesNotExist.code,
          Warnings.Update.LocationDoesNotExist.message,
          { locationIdList: invalidLocations }
        );
      }
      toUpdate.locationIdList = validLocations;
    }

    // hds 8
    if (dtoIn.image) {
      let binary;
      // 8.1, 8.1.1
      const image = await Trip.checkAndGetImageAsStream(dtoIn.image, Errors.Update, uuAppErrorMap);

      if (!trip.image) {
        // 8.2, 8.2.A
        try {
          binary = await UuBinaryAbl.createBinary(awid, {
            data: image,
            filename: dtoIn.image.filename,
            contentType: dtoIn.image.contentType,
          });
        } catch (e) {
          // 8.2.A.1
          throw new Errors.Update.UuBinaryCreateFailed({ uuAppErrorMap }, e);
        }
      } else {
        // 8.2.B
        try {
          binary = await UuBinaryAbl.updateBinaryData(awid, {
            data: image,
            code: trip.image,
            filename: dtoIn.image.filename,
            contentType: dtoIn.image.contentType,
            revisionStrategy: "NONE",
          });
        } catch (e) {
          // 8.2.B.1
          throw new Errors.Update.UuBinaryUpdateBinaryDataFailed({ uuAppErrorMap }, e);
        }
      }
      toUpdate.image = binary.code;
    }

    // hds 9
    if (dtoIn.deleteImage && trip.image) {
      await UuBinaryAbl.deleteBinary(awid, {
        code: trip.image,
        revisionStrategy: "NONE",
      });
      toUpdate.image = null;
    }

    // hds 10
    toUpdate.awid = awid;
    let updatedTrip;
    try {
      updatedTrip = await this.dao.update(toUpdate);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // 10.1
        throw new Errors.Update.TripDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 11
    const dtoOut = {
      ...updatedTrip,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new UpdateAbl();
