const Joi = require("joi");

exports.create = Joi.object({
  address: Joi.string().required(),
  contractAddress: Joi.string().required(),
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().required(),
  imageLinks: Joi.array().items(Joi.string()),
  tokenId: Joi.string().required(),
  finalUrl: Joi.string().required(),
});

exports.get = Joi.object({
  itemId: Joi.string().required(),
});
