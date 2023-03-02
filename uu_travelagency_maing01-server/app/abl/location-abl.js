"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/location-error.js");
const {Schemas} = require("./constants");

const WARNINGS = {

};

class LocationAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async list(awid) {
    const list = await this.dao.list(awid);
    // hds 4
    return {
      ...list
    };

  }

}

module.exports = new LocationAbl();
