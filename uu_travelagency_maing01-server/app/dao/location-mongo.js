"use strict";
const { ObjectId } = require("bson");
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class LocationMongo extends UuObjectDao {
  constructor(...args) {
    super(...args);
  }

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, country: 1 });
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

  async list(filterMap={}, awid, order, pageInfo={}) {
    const filter = {...filterMap, awid};
    const sort = { name: order === "asc" ? 1 : -1 };


    return await super.find(filter, pageInfo, sort);
  }

  async listByIdList(awid, locationIdList) {
    const filter = {
      awid,
      _id: {
        $in: locationIdList.map((id) => new ObjectId(id)),
      },
    };

    return await super.find(filter);
  }


}

module.exports = LocationMongo;
