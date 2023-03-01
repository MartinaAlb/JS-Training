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

  async create(uuObject) {
    if (uuObject.locationIdList) {
      uuObject.locationIdList = uuObject.locationIdList.map((locationId) => new ObjectId(locationId));
    }
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async update(uuObject) {
    if (uuObject.locationIdList) {
      uuObject.locationIdList = uuObject.locationIdList.map((locationId) => new ObjectId(locationId));
    }
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }


  // getByName DAO method

  async list(awid, sortBy, order, pageInfo) {
    const filter = { awid };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };

    return await super.find(filter, pageInfo, sort);
  }

  async listByLocationIdList(awid, locationIdList, sortBy, order, pageInfo) {
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
