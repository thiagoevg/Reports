//
import { getModelToken } from '@nestjs/mongoose'
import { TestingModule } from '@nestjs/testing'
import { StubFactory } from '../../repository/__mocks__/stubs-data'
import { OrdersMock, VenuesMock } from '../../repository/__mocks__/models-mock'
import { TestUtils } from '../../utils/test-utils'
import { VenuesModule } from './venues.module'
import { VenuesService } from './venues.service'
import { getLegacyModelToken, Orders, Venues } from '@tagmedev/tagme-nest-models'

describe('VenuesService', () => {
	let service: VenuesService
	let venuesModel: VenuesMock

	//
	beforeAll(async () => {
		// Pra realizar o teste do "VenuesService" é necessario que o nest crie a arvore de dependencia do "VenuesModule".
		// O método utilitario abaixo cria o modulo de teste utilizando como raiz o "VenuesModule".
		const module: TestingModule = await TestUtils.createMockedModelsModule(
			VenuesModule,
			// Os dois argumentos a seguir são opcionais, como mostra o exemplo './venues.controller.spec.ts'.
			// Caso queiram apagar, na teoria não devera causar nenhum erro porque o método utilitario tentara sozinho mocar
			// todas as dependencias necessárias. Mas dependendo da complexidade do teste, provavelmente seja necessário utilisar essas opções.

			// Coloque aqui todos os modelos que queira mocar, lembre de usar uma classe que extenda 'ModelMock'. A lista também aceita
			// nomes, nesse caso o nome somente reforçaria a criação de um modelo padrão (ModelMock) pro determinado modelo. ex: [Orders.name, [Venues.name, VenuesMock]]
			[
				[getLegacyModelToken(Venues.name), VenuesMock],
				[getLegacyModelToken(Orders.name), OrdersMock],
			],

			// Coloque aqui os serviços que deseja mocar, ex:
			[
				// [UserService, { getUserById: () => "teste" }]
			]
		)

		service = module.get<VenuesService>(VenuesService)

		// Captura o model que foi injetetado pra ser utilizado em conjunto com os testes. Isso é, antes de chamar qualquer método do 'service',
		// esse model será utilizado pra preparar o campo para assim o service 'pensar' que esta trabalhando com um model real.
		venuesModel = module.get<VenuesMock>(getLegacyModelToken(Venues.name))
	})

	//
	it('service should be defined', () => {
		expect(service).toBeDefined()
	})

	//
	describe('with stub sample', () => {
		// O StubFactory é somento um padrão pra criar esboços para serem utilizados nos testes
		const venueStub = StubFactory.createForVenue()

		// O model mocado 'venuesModel' é do tipo 'ModelMock', o método 'setEntity' alterada a entidade mocada dentro do model,
		// qualquer acesso futuro aos métodos (find, findOne, etc..) que sera efetuado pelo venueRepository retorna no final a entidade setada aqui.
		beforeAll(() => {
			venuesModel.setEntity(venueStub)
		})

		//
		describe('when get email', () => {
			let email: string

			beforeAll(async () => {
				// Espiando o método "findOne" do model antes de realizar a chamada do service
				jest.spyOn(venuesModel, 'findOne')
				// Realizando a chamada do método que estamos interessados em testar
				// internamente o venuesRepository vai realizar a busca pelo id e vai bater no 'venuesModel' mocado assim retornando o esboço
				// da entidade que forçamos acima e por final deverá retornar o email desse esboço.
				email = await service.getVenueEmail(venueStub._id.toString())
			})

			it('should be defined', () => {
				expect(email).toBeDefined()
			})

			it('then it should call the model', () => {
				// Verificando também se o método do model mocado foi chamado (como o mesmo estava sendo espiado)
				expect(venuesModel.findOne).toBeCalled()
			})

			it('should be equal', () => {
				expect(email).toEqual('sante13restaurante@gmail.com')
			})
		})
	})
})
