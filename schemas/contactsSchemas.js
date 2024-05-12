import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.alternatives([Joi.string(), Joi.number()]).required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.alternatives([Joi.string(), Joi.number()]),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
