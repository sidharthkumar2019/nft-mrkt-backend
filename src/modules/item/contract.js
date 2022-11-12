const Joi = require("joi");

exports.create = Joi.object({
  ownerId: Joi.string().required(),
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().required(),
  imageLinks: Joi.array().items(Joi.string()),
});
