const Joi = require("joi");

//=> using Joi to validate body input

exports.check = Joi.object({
  fname: Joi.string().min(16).max(64).required(),
  lname: Joi.string().min(16).max(64).required(),
});
