import { Test, TestingModule } from '@nestjs/testing'
import { TagmeNestModelsService } from './tagme-nest-models.service'

describe('TagmeNestModelsService', () => {
	let service: TagmeNestModelsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TagmeNestModelsService],
		}).compile()

		service = module.get<TagmeNestModelsService>(TagmeNestModelsService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
