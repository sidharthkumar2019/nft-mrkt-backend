const Joi = require("joi");

exports.create = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  ownerId: Joi.string().required(),
  description: Joi.string().max(200),
  contractAddress: Joi.string().required(),
});

exports.getAll = Joi.object({
  ownerId: Joi.string().required(),
});

exports.get = Joi.object({
  collectionId: Joi.string().required(),
});
