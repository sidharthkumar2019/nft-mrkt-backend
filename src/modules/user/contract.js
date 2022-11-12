const Joi = require("joi");

exports.create = Joi.object({
  address: Joi.string().required(),
  username: Joi.string().min(3).max(20),
});

exports.login = Joi.object({
  address: Joi.string().required(),
});

exports.getAllItems = Joi.object({
  userId: Joi.string().required(),
});
