const tripListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  locationIdList: array(id(), 1, 10),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const tripGetDtoInType = shape({
  id: id().isRequired(),
});

const tripCreateDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000),
  image: binary(),
  locationIdList: array(id(), 1, 10).isRequired(),
  capacity: integer().isRequired(),
  departureDate: date().isRequired(),
  pricePerPerson: integer().isRequired(),

});

const tripUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(255).isRequired(),
  text: string(4000),
  image: binary(),
  locationIdList: array(id(), 1, 10).isRequired(),
  capacity: integer().isRequired(),
  departureDate: date().isRequired(),
  pricePerPerson: integer().isRequired(),
  deleteImage: boolean(),
});

const tripDeleteDtoInType = shape({
  id: id().isRequired()
});
