import * as Joi from "joi";

export  const joiValidationSchema = Joi.object({
    DATABASE:Joi.required(),
    PORT:Joi.number().default(3005)
})