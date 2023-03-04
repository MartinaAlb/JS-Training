const tripCreateDtoInType = shape({
  firsname: string(255).isRequired(),
  lastname: string(40),
  phone: string(40),
  mail: string(40),
  idCardNumber: string(40),
});
