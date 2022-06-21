import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { DatabaseConfig } from '../config/database.config'

// Models
import { Venues, VenuesSchema } from '../../libs/tagme-nest-models/model/venues'

// Repositories
import { VenuesRepository } from '../venues/repositories/venue.repository'

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useClass: DatabaseConfig,
			connectionName: 'Tagme',
		}),
		MongooseModule.forFeature(
			[
				{
					name: Venues.name,
					schema: VenuesSchema,
				},
			],
			'Tagme'
		),
	],
	providers: [VenuesRepository],
	exports: [VenuesRepository],
})
export class RepositoryModule {}
