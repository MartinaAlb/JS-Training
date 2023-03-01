"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TravelagencyMainMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async getByAwid(awid) {
    return await super.findOne({ awid });
  }
}

module.exports = TravelagencyMainMongo;
