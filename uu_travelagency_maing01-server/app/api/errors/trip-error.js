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

const Get = {
  UC_CODE: `${TRIP_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TravelagencyMainDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}travelagencyMainDoesNotExist`;
      this.message = "UuObject travelagencyMain does not exist.";
    }
  },
  TravelagencyMainNotInCorrectState: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}travelagencyMainNotInCorrectState`;
      this.message = "UuObject travelagencyMain is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
};

const Create = {
  UC_CODE: `${TRIP_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TravelagencyMainDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}travelagencyMainDoesNotExist`;
      this.message = "UuObject travelagencyMain does not exist.";
    }
  },
  TravelagencyMainNotInCorrectState: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}travelagencyMainNotInCorrectState`;
      this.message = "UuObject travelagencyMain is not in correct state.";
    }
  },
  InvalidText: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidText`;
      this.message = "Invalid text - it cannot have no characters or be of zero length if image is not provided.";
    }
  },
  UuBinaryCreateFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Create uuBinary failed.";
    }
  },
  TripDaoCreateFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}tripDaoCreateFailed`;
      this.message = "Create trip by trip DAO create failed.";
    }
  },
  LocationDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist";
    }
  },
  InvalidImage: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidImage`;
      this.message = "Image is invalid or it is not an image.";
    }
  },
};

const Update = {
  UC_CODE: `${TRIP_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TravelagencyMainDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}travelagencyMainDoesNotExist`;
      this.message = "UuObject travelagencyMain does not exist.";
    }
  },
  TravelagencyMainNotInCorrectState: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}travelagencyMainNotInCorrectState`;
      this.message = "UuObject travelagencyMain is not in correct state.";
    }
  },
  InvalidInputCombination: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidInputCombination`;
      this.message = "Invalid input combination - it is not possible to update and delete image at the same time.";
    }
  },
  TextCannotBeRemoved: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}textCannotBeRemoved`;
      this.message = "Text cannot be removed if trip would end up without both text and image.";
    }
  },
  ImageCannotBeDeleted: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}imageCannotBeDeleted`;
      this.message = "Image cannot be deleted if trip would end up without both text and image.";
    }
  },
  UserNotAuthorized: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  TripDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  UuBinaryCreateFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryCreateFailed`;
      this.message = "Creating uuBinary failed.";
    }
  },
  UuBinaryUpdateBinaryDataFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuBinaryUpdateBinaryDataFailed`;
      this.message = "Updating uuBinary data failed.";
    }
  },
  InvalidImage: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidImage`;
      this.message = "Image is invalid or it is not an image.";
    }
  },
  TripDaoUpdateFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}tripDaoUpdateFailed`;
      this.message = "Update trip by trip Dao update failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${TRIP_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TravelagencyMainDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}travelagencyMainDoesNotExist`;
      this.message = "UuObject travelagencyMain does not exist.";
    }
  },
  TravelagencyMainNotInCorrectState: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}travelagencyMainNotInCorrectState`;
      this.message = "UuObject travelagencyMain is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  UserNotAuthorized: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  UuBinaryDeleteFailed: class extends TravelagencyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuBinaryDeleteFailed`;
      this.message = "Deleting uuBinary failed.";
    }
  },
};

module.exports = {
  List,
  Get,
  Create,
  Update,
  Delete,
};


