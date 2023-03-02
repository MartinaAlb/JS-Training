"use strict";
const LocationAbl = require("../../abl/location-abl.js");

class LocationController {

  list(ucEnv) {
    return LocationAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new LocationController();
