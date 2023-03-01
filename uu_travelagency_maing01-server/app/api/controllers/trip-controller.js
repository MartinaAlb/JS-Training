"use strict";
const ListAbl = require("../../abl/trip/list-abl");

class TripController {

  static list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  // get

  // create

  // update

  // delete

}

module.exports = TripController;
