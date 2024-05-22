import Joi from "joi";

export const authSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

export const authSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});
