const Errors = require("../errors/trip-error.js");

const Warnings = {
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
    LocationDoesNotExist: {
      code: `${Errors.Create.UC_CODE}locationDoesNotExist`,
      message: "One or more locations with given id do not exist.",
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
    LocationDoesNotExist: {
      code: `${Errors.Update.UC_CODE}locationDoesNotExist`,
      message: "One or more locations with given id do not exist.",
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;


