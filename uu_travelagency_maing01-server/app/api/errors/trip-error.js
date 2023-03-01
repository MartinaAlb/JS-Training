"use strict";

const TravelagencyMainUseCaseError = require("./travelagency-main-use-case-error");
const TRIP_ERROR_PREFIX = `${TravelagencyMainUseCaseError.ERROR_PREFIX}TRIP/`;

const List = {
  UC_CODE: `${TRIP_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TravelagencyMainDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}travelagencyMainDoesNotExist`;
      this.message = "UuObject travelagencyMain does not exist.";
    }
  },
  TravelagencyMainNotInCorrectState: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}travelagencyMainNotInCorrectState`;
      this.message = "UuObject travelagencyMain is not in correct state.";
    }
  },
};

module.exports = {
  List,
};
