export default () => ({
	port: process.env.PORT,

	database: {
		retryAttempts: Number(process.env.MONGO_RETRY_ATTEMPTS),
		retryDelay: Number(process.env.MONGO_RETRY_DELAY),
	},

	legacyDatabase: {
		uri: process.env.LEGACY_MONGO_URI,
		connectionName: process.env.LEGACY_MONGO_CONNECTION_NAME,
	},

	MMDatabase: {
		uri: process.env.MONGO_URI,
		connectionName: process.env.MONGO_CONNECTION_NAME,
	},

	cache: {
		host: process.env.CACHE_URI,
		port: process.env.CACHE_PORT,
		pass: process.env.CACHE_PASS,
	},

	datadog: {
		apiKey: process.env.DATADOG_API_KEY,
	},

	venuesDefaultTz: 'America/Sao_Paulo',
})
