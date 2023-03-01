const tripListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  locationIdList: array(id(), 1, 10),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const tripCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  text: uu5String(4000).isRequired("image"),
  image: binary().isRequired("text"),
  locationIdList: array(id(), 1, 10),
  capacity: uu5String(20),
  departureDate: uu5String(20),
  pricePerPerson: uu5String(20),
  participantIdList: array(id(), 1, 10),
});
