//@@viewOn:constants
const Constants = {
  Schemas: {
    TRAVELAGENCY_MAIN: "travelagencyMain",
    LOCATION: "location",
    TRIP: "trip",
    PARTICIPANT: "participant",

  },

  Trips: {
    States: {
      INIT: "init",
      ACTIVE: "active",
      UNDER_CONSTRUCTION: "underConstruction",
      CLOSED: "closed",
    },
    get NonFinalStates() {
      return new Set([this.States.ACTIVE, this.States.UNDER_CONSTRUCTION]);
    },
  },

  Profiles: {
    AUTHORITIES: "Authorities",
    EXECUTIVES: "Executives",
    READERS: "Readers",
  },
};
//@@viewOff:constants

//@@viewOn:exports
module.exports = Constants;
//@@viewOff:exports
