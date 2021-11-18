export class ModelMock {
	dto: any

	constructor(dto: any) {
		this.dto = dto
	}

	save() {
		return jest.fn()
	}

	static find() {
		return { exec: jest.fn() }
	}
	static findOne() {
		return { exec: jest.fn() }
	}
	static findById() {
		return { exec: jest.fn() }
	}
	static count() {
		return { exec: jest.fn() }
	}
	static update() {
		return { exec: jest.fn() }
	}
	static updateOne() {
		return { exec: jest.fn() }
	}
	static remove() {
		return { exec: jest.fn() }
	}
	static findByIdAndRemove() {
		return { exec: jest.fn() }
	}
	static checkCooldown() {
		return { exec: jest.fn() }
	}
}
