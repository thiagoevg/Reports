import * as Joi from 'joi'

export const environmentSchema = Joi.object({
	NODE_ENV: Joi.string()
		.valid('local', 'debug', 'test', 'staging', 'development', 'production')
		.default('local'),

	MONGO_URI: Joi.string().required(),
	MONGO_RETRY_ATTEMPTS: Joi.number().required(),
	MONGO_RETRY_DELAY: Joi.number().required(),
	MONGO_CONNECTION_NAME: Joi.string().required(),
})
