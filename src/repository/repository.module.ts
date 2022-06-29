import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Orders, OrdersSchema } from '../../libs/tagme-nest-models/model/order'
import { Venues, VenuesSchema } from '../../libs/tagme-nest-models/model/venues'
import { VenuesRepository } from './venuesRepository/venue.repository'

@Module({
	// OBS: Não realizar nenhuma configuração por aqui, por exemplo: MongooseModule.forRootAsync({...
	//      Caso este projeto seja usado como exemplo, siga o mesmo padrão, removendo todas as configurações de todos modulos que não sejam o global.
	imports: [
		// Providencie somente os models

		// Features do db Legacy
		MongooseModule.forFeature(
			[
				{
					name: Venues.name,
					schema: VenuesSchema,
				},

				{
					name: Orders.name,
					schema: OrdersSchema,
				},
			],
			process.env.LEGACY_MONGO_CONNECTION_NAME
		),

		// Features do db MM
		MongooseModule.forFeature(
			[
				//
			],
			process.env.MONGO_CONNECTION_NAME
		),
	],
	providers: [VenuesRepository],
	exports: [VenuesRepository],
})
export class RepositoryModule {}
