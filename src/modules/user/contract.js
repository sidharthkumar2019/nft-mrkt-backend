const Joi = require("joi");

exports.create = Joi.object({
  address: Joi.string().required(),
  username: Joi.string().min(3).max(20),
});

exports.login = Joi.object({
  address: Joi.string().required(),
});

exports.get = Joi.object({
  address: Joi.string().required(),
});

exports.getById = Joi.object({
  userId: Joi.string().required(),
});

exports.getAllItems = Joi.object({
  userId: Joi.string().required(),
});

exports.receive = Joi.object({
  userAddress: Joi.string().required(),
  itemId: Joi.string().required(),
});

exports.received = Joi.object({
  userId: Joi.string().required(),
});
