const tripListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  locationIdList: array(id(), 1, 10),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});
