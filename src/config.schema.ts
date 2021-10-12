import * as joi from '@hapi/joi';

export const configValidationSchema = joi.object({
  NODE_MODE: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().default(5432).required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_DATABASE: joi.string().required(),
  JWT_SECRET: joi
    .string()
    .default('my-32-character-ultra-secure-and-ultra-long-secret')
    .required(),
  JWT_EXPIRES_AFTER_SECONDS: joi.number().default(3600).required(),
});
