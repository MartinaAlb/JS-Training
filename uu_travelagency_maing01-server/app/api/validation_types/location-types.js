const tripCreateDtoInType = shape({
  name: string(255).isRequired(),
  address: string(4000),
  city: string(40),
  country: string(40),
  phoneNumber: integer(),
});
