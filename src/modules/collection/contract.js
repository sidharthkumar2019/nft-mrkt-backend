const Joi = require("joi");

exports.create = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  ownerId: Joi.string().required(),
  description: Joi.string().max(200),
});
