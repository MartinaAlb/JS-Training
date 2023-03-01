"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/trip-error");
const Warnings = require("../../api/warning/trip-warning");
const InstanceChecker = require("../../component/instance-checker");
const { Profiles, Schemas, Trips } = require("../constants");

const DEFAULTS = {
  sortBy: "name",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.TRIP);
  }

  async list(awid, dtoIn, authorizationResult) {
    let uuAppErrorMap = {};

    // hds 1, 1.1
    const validationResult = this.validator.validate("tripListDtoInType", dtoIn);
    // 1.2, 1.2.1, 1.3, 1.3.1
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // 1.4
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;


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
      Errors.List,
      uuAppErrorMap
    );

    // hds 3
    let list;
    if (dtoIn.locationIdList) {
      // 3.A
      list = await this.dao.listByLocationIdList(awid, dtoIn.locationIdList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } else {
      // 3.B
      list = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    // hds 4
    const dtoOut = {
      ...list,
      uuAppErrorMap,
    };

    return dtoOut;
  }
}

module.exports = new ListAbl();
