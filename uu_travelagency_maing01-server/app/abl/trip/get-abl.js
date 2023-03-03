"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error");
const Warnings = require("../../api/warnings/trip-warnings");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Trips } = require("../constants");

class GetAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.TRIP);
    this.locationDao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async get(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("tripGetDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // hds 2
    const allowedStateRules = {
      [Profiles.AUTHORITIES]: new Set([Trips.States.ACTIVE, Trips.States.UNDER_CONSTRUCTION, Trips.States.CLOSED]),
      [Profiles.EXECUTIVES]: new Set([Trips.States.ACTIVE, Trips.States.UNDER_CONSTRUCTION]),
      [Profiles.READERS]: new Set([Trips.States.ACTIVE]),
    };
    // 2.1, 2.1.1, 2.2, 2.2.1, 2.2.2
    await InstanceChecker.ensureInstanceAndState(
      awid,
      allowedStateRules,
      authorizationResult,
      Errors.Get,
      uuAppErrorMap
    );

    // hds 3
    const trip = await this.dao.get(awid, dtoIn.id);
    if (!trip) {
      // 3.1
      throw new Errors.Get.TripDoesNotExist(uuAppErrorMap, { tripId: dtoIn.id });
    }
    const location = await this.locationDao.get(awid, trip.locationId)


    // hds 4
    const dtoOut = {
      ...trip,
      location,
      uuAppErrorMap,
    };



    return dtoOut;
  }
}

module.exports = new GetAbl();
