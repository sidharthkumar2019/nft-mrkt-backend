const Joi = require("joi");

exports.check = Joi.object({
  fname: Joi.string().min(16).max(64).required(),
  lname: Joi.string().min(16).max(64).required(),
});

exports.create = Joi.object({
  address: Joi.string().required(),
  username: Joi.string().min(3).max(20),
});

exports.login = Joi.object({
  address: Joi.string().length(64).required(),
});
