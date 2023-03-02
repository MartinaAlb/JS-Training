//@@viewOn:imports
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Schemas } = require("../abl/constants");
const { Base64 } = require("uu_appg01_server").Utils;
const FileHelper = require("../helpers/file-helper");
//@@viewOff:imports

//@@viewOn:components
class Trip {
  constructor() {
    this.locationDao = DaoFactory.getDao(Schemas.LOCATION);
  }

  /**
   * Checks whether locations exist for specified awid and removes them from locationList (so it, in the end, contains
   * only ids of locations, that do not exist).
   * @param {String} awid Used awid
   * @param {Array} locationIdList An array with ids of locations
   * @returns {Promise<[]>} Ids of existing locations
   */
  async checkLocationsExistence(awid, locationIdList = []) {
    const validLocations = [];
    const invalidLocations = [];
    let locationFound;
    const storedLocations = await this.locationDao.listByIdList(awid, locationIdList);
    locationIdList.forEach((id) => {
      locationFound = storedLocations.itemList.find((it) => it.id.toString() === id);
      if (locationFound) {
        validLocations.push(id.toString());
      } else {
        invalidLocations.push(id.toString());
      }
    });

    return { validLocations: [...new Set(validLocations)], invalidLocations: [...new Set(invalidLocations)] };
  }

  /**
   * Checks whether image is of proper content-type
   * @param {Stream|Base64} image Image as stream or base64
   * @param {Object} errors Object with error definitions
   * @returns {Promise<[]>} Binary stream
   */
  async checkAndGetImageAsStream(image, errors, uuAppErrorMap) {
    let streamToReturn;
    //check if stream or base64
    if (image.readable) {
      //check if the stream is valid
      const { valid: isValidStream, stream } = await FileHelper.validateImageStream(image);
      if (!isValidStream) {
        throw new errors.InvalidImage({ uuAppErrorMap });
      }
      streamToReturn = stream;
    } else {
      //check if the base64 is valid
      let binaryBuffer = Base64.urlSafeDecode(image, "binary");
      if (!FileHelper.validateImageBuffer(binaryBuffer).valid) {
        throw new errors.InvalidImage({ uuAppErrorMap });
      }

      streamToReturn = FileHelper.toStream(binaryBuffer);
    }

    return streamToReturn;
  }
}
//@@viewOff:components

//@@viewOn:exports
module.exports = new Trip();
//@@viewOff:exports
