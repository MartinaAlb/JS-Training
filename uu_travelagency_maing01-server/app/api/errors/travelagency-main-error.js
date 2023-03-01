"use strict";
const TravelagencyMainUseCaseError = require("./travelagency-main-use-case-error.js");
const TRAVELAGENCY_MAIN_ERROR_PREFIX = `${TravelagencyMainUseCaseError.ERROR_PREFIX}travelagencyMain/`;

const Init = {
  UC_CODE: `${TRAVELAGENCY_MAIN_ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  TravelagencyDaoCreateFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}travelagencyDaoCreateFailed`;
      this.message = "Create travelagency by DAO method failed.";
    }
  },
};

const Load = {
  UC_CODE: `${TRAVELAGENCY_MAIN_ERROR_PREFIX}load/`,

  TravelagencyMainDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Load.UC_CODE}travelagencyMainDoesNotExist`;
      this.message = "UuObject travelagencyMain does not exist.";
    }
  },
};

module.exports = {
  Init,
  Load,
};
