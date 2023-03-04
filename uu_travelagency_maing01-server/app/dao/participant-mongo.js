"use strict";
const { ObjectId } = require("bson");
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ParticipantMongo extends UuObjectDao {
  constructor(...args) {
    super(...args);
  }

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });

  }

  async create(uuObject) {
    if (uuObject.participantId) {
      uuObject.participantId = uuObject.participantIdList.map((participantId) => new ObjectId(participantId));
    }
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async update(uuObject) {
    if (uuObject.participantId) {
      uuObject.participantId = uuObject.participantIdList.map((participantId) => new ObjectId(participantId));
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

  async listByIdList(awid, participantIdList) {
    const filter = {
      awid,
      _id: {
        $in: participantIdList.map((id) => new ObjectId(id)),
      },
    };

    return await super.find(filter);
  }


}

module.exports = ParticipantMongo;
