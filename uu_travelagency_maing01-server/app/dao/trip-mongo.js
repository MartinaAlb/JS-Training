"use strict";
const { ObjectId } = require("bson");
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TripMongo extends UuObjectDao {
  constructor(...args) {
    super(...args);
  }

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, locationIdList: 1 });
    await super.createIndex({ awid: 1, name: 1 });

  }

  // create DAO method

  // get DAO method

  // getByName DAO method

  // update DAO method

  // delete DAO method

  // list DAO method

  async list(awid, sortBy, order, pageInfo) {
    const filter = { awid };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }

  async listByCategoryIdList(awid, locationIdList, sortBy, order, pageInfo) {
    const filter = {
      awid,
      locationIdList: {
        $in: locationIdList.map((id) => new ObjectId(id)),
      },
    };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }
}

module.exports = TripMongo;
