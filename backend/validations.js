//JOI VALIDATION IMPORT
const Joi = require('@hapi/joi');

//REGISTRATION VALIDATION
//GETTING REQ.BODY AS DATA PARAMETER
const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

//LOGIN VALIDATION
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
