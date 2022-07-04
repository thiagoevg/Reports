import * as Joi from 'joi'

export const environmentSchema = Joi.object({
	NODE_ENV: Joi.string().valid('local', 'debug', 'test', 'development', 'production').default('local'),

	//
	MONGO_URI: Joi.string().required(),
	MONGO_CONNECTION_NAME: Joi.string().required(),

	LEGACY_MONGO_URI: Joi.string().required(),
	LEGACY_MONGO_CONNECTION_NAME: Joi.string().required(),

	MONGO_RETRY_ATTEMPTS: Joi.number().required(),
	MONGO_RETRY_DELAY: Joi.number().required(),

	CACHE_URI: Joi.string().required(),
	CACHE_PORT: Joi.number().required(),
	CACHE_PASS: Joi.string().required()
})


