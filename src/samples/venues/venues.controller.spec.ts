import { TestingModule } from '@nestjs/testing'
import { TestUtils } from '../../utils/test-utils'
import { VenuesController } from './venues.controller'
import { VenuesModule } from './venues.module'

describe('VenuesController', () => {
	let controller: VenuesController

	beforeEach(async () => {
		// Pra realizar o teste do "VenuesController" é necessario que o nest crie a arvore de dependencia do "VenuesModule".
		// O metodo utilitario abaixo cria o modulo de teste utilizando como raiz o "VenuesModule".
		const module: TestingModule = await TestUtils.createMockedModelsModule(VenuesModule)
		//
		controller = module.get<VenuesController>(VenuesController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
