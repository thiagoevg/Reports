import { Test, TestingModule } from '@nestjs/testing'
import { TestUtils } from '../../utils/test-utils'
import { SimpleAppController } from './simple-app.controller'
import { SimpleAppModule } from './simple-app.module'
import { SimpleAppService } from './simple-app.service'

describe('AppController', () => {
	let appController: SimpleAppController

	beforeEach(async () => {
		// Pra realizar o teste do "SimpleAppController" é necessario que o nest crie a arvore de dependencia do "SimpleAppModule".
		// O metodo utilitario abaixo cria o modulo de teste utilizando como raiz o "SimpleAppModule".
		const module: TestingModule = await TestUtils.createMockedModelsModule(SimpleAppModule)
		//
		appController = module.get<SimpleAppController>(SimpleAppController)
	})

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!')
		})
	})
})
