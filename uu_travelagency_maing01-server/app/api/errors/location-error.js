"use strict";

const TravelagencyMainUseCaseError = require("./travelagency-main-use-case-error.js");
const LOCATION_ERROR_PREFIX = `${TravelagencyMainUseCaseError.ERROR_PREFIX}location/`;

const List = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}list/`,

};

module.exports = {
  List
};
