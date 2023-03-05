const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  // fire up application and database
  // Authentication, Authorization and verification of System States are disabled, because they are not objective of testing
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Trip uuCMD tests", () => {
  test("example 3 test - trip/create", async () => {
    let dtoIn = {
      name: "The beauty of the historic city",
      locationId: "6400c870d20feb6eecbc44d8",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam commod…",
      capacity: 10,
      pricePerPerson: 7584,
      departureDate: "2023-03-22"
    };
    let result = await TestHelper.executePostCommand("trip/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.locationId).toEqual(dtoIn.locationId);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.capacity).toEqual(dtoIn.capacity);
    expect(result.data.pricePerPerson).toEqual(dtoIn.pricePerPerson);
    expect(result.data.departureDate).toEqual(dtoIn.departureDate);

    expect(result.data.uuAppErrorMap).toEqual({});
  });
});
