import { INestApplication } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import request from 'supertest'
import { Model } from 'mongoose'
import { E2EConnectionType, TestUtils } from '../../src/utils/test-utils'

import { StubFactory } from '../../src/repository/__mocks__/stubs-data'
import { VenuesModule } from '../../src/samples/venues/venues.module'
import { getLegacyModelToken, Venues } from '@tagmedev/tagme-nest-models'

describe('VenuesModule (e2e)', () => {
	let app: INestApplication

	//
	let venuesModel: Model<Venues>
	let httpService: HttpService

	//
	beforeAll(async () => {
		// Nesse teste, o ideal é mocar somente serviços externos ou indesejados.
		// Importante: Os modelos não são mocados.

		// O modulo criado utiliza uma conexão local com o banco em memoria criado no tempo de inicialização dos testes.
		// Lembrando que no final de todos os testes e2e o banco em memoria sera finalizado.
		const module = await TestUtils.createE2EModule(
			VenuesModule,
			// Esse parametro é opcional
			// Coloque externos aqui os serviços que deseja mocar, ex:
			[
				// [ PartnerApiService, PartnerApiServiceMock ]
			],
			E2EConnectionType.All // Because the Repository make connections with legacy and menu manager database models
		)

		//
		app = module.createNestApplication()

		// Captura o modelo do venus
		// obs: (Nesse testes os modelos não são mocados, todos possuem conexão com banco)
		venuesModel = module.get<Model<Venues>>(getLegacyModelToken(Venues.name))

		// Esse serviço é providenciado por padrão na criação do modulo de testes
		httpService = module.get<HttpService>(HttpService)

		//
		await app.init()
	})

	describe('with stub sample', () => {
		// Cria um esboço
		const venueStub = StubFactory.createForVenue()

		// Salva o esboço no banco
		beforeAll(async () => {
			await new venuesModel(venueStub).save()
		})

		//
		it(`/venues/email/${venueStub._id} (GET) should return the email`, async () => {
			//
			await request(app.getHttpServer())
				.get(`/venues/email/${venueStub._id.toString()}`)
				.expect(200)
				.expect('sante13restaurante@gmail.com')
		})

		// Removendo esboço do banco
		afterAll(async () => {
			await venuesModel.deleteOne({ _id: venueStub._id })
		})
	})
})
