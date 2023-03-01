//@@viewOn:imports
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Schemas } = require("../abl/constants");
//@@viewOff:imports

//@@viewOn:components
class InstanceChecker {
  constructor() {
    this.dao = DaoFactory.getDao(Schemas.TRAVELAGENCY_MAIN);
  }

  /**
   * Checks whether instance exists and is of proper state
   * @param {String} awid Used awid
   * @param {Set} states A map with allowed states
   * @param {Object} errors Object with error definitions
   * @param {Object} uuAppErrorMap Standard uuAppErrorMap
   * @returns {Promise<[]>} instance itself
   */
  async ensureInstanceAndState(awid, allowedStateRules, authorizationResult, errors, uuAppErrorMap = {}) {
    // HDS 1
    const travelagencyMain = await this.ensureInstance(awid, errors, uuAppErrorMap);

    // HDS 2
    const authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    // note: the "biggest" profile is always in first position
    const allowedStates = allowedStateRules[authorizedProfiles[0]];

    // HDS 3
    if (!allowedStates.has(travelagencyMain.state)) {
      throw new errors.TravelagencyMainDoesNotExist(
        { uuAppErrorMap },
        {
          awid,
          state: travelagencyMain.state,
          expectedState: Array.from(allowedStates),
        }
      );
    }

    return travelagencyMain;
  }

  /**
   * Checks whether instance exists
   * @param {String} awid Used awid
   * @param {Object} errors Object with error definitions
   * @param {Object} uuAppErrorMap Standard uuAppErrorMap
   * @returns {Promise<[]>} instance itself
   */
  async ensureInstance(awid, errors, uuAppErrorMap) {
    // HDS 1
    let travelagencyMain = await this.dao.getByAwid(awid);

    // HDS 2
    if (!travelagencyMain) {
      // 2.1.A
      throw new errors.TravelagencyMainDoesNotExist({ uuAppErrorMap }, { awid });
    }

    return travelagencyMain;
  }
}
//@@viewOff:components

//@@viewOn:exports
module.exports = new InstanceChecker();
//@@viewOff:exports
