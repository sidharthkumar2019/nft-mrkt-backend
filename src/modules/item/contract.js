const Joi = require("joi");

exports.create = Joi.object({
  ownerId: Joi.string().required(),
  walletAddress: Joi.string().required(),
  collectionId: Joi.string().required(),
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().required(),
  imageLinks: Joi.array().items(Joi.string()),
});

exports.get = Joi.object({
  itemId: Joi.string().required(),
});
