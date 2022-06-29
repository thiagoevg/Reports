const fakeHost = 'http://localhost:8080'
const fakeApiUser = 'shdksjdhksjdh'
const fakeApikey = '0987654321'

const env = {

}

export class ConfigServiceMock {
	get(key: string) {
		return env[key]
	}
}

export class CacheServiceMock {
	private values = {}

	get(key: string) {
		return this.values[key]
	}

	set(key: string, value: any) {
		this.values[key] = value
	}
}
