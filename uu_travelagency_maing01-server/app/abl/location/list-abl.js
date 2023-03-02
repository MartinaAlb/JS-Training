"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/location-error");
const Warnings = require("../../api/warnings/location-warnings");
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
    this.dao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async list(awid, dtoIn) {
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = 5;
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    let list = await this.dao.list(awid, dtoIn.order);
    return list;
  }
}

module.exports = new ListAbl();
