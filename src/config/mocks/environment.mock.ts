const fakeHost = 'http://localhost:8080'
const fakeApikey = '0987654321'

const env = {
	database: {
		uri: 'mongodb://localhost:27017/tagmedev',
		retryAttempts: 1,
		retryDelay: 200,
		connectionName: 'tagmedev',
	},
}

export class ConfigServiceMock {
	get(key: string) {
		return env[key]
	}
}
export class CacheServiceMock {
	private values = { ...env }
	get(key: string) {
		return this.values[key]
	}
	set(key: string, value: any) {
		this.values[key] = value
	}
}
