export default () => ({
	port: process.env.PORT,

	database: {
		uri: process.env.MONGO_URI,
		retryAttempts: Number(process.env.MONGO_RETRY_ATTEMPTS),
		retryDelay: Number(process.env.MONGO_RETRY_DELAY),
	},

	venuesDefaultTz: 'America/Sao_Paulo',
})
