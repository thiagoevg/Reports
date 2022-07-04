import { CacheModule, Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import environment from '../config/environment.config'
import { environmentSchema } from '../../environment/environmentSchema'
import { LegacyDatabaseOptionsFactory } from './legacyDatabase-options.factory'
import { DatabaseOptionsFactory } from './database-options.factory'
import { RedisOptionsFactory } from './cache-options.factory'

//
const { NODE_ENV } = process.env
const prod = !NODE_ENV || NODE_ENV === 'production'

@Global()
@Module({
	imports: [
		// Deve ser o primeiro dessa lista (ele que vai providenciar as envs)
		ConfigModule.forRoot({
			envFilePath: !prod ? `./environment/${process.env.NODE_ENV}.env` : '',
			isGlobal: true,
			load: [environment],
			validationSchema: environmentSchema,
		}),

		// Abaixo do ConfigModule.forRoot as envs estarão disponívels
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useClass: LegacyDatabaseOptionsFactory,
			connectionName: process.env.LEGACY_MONGO_CONNECTION_NAME,
		}),

		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useClass: DatabaseOptionsFactory,
			connectionName: process.env.MONGO_CONNECTION_NAME,
		}),

		CacheModule.registerAsync({
			useClass: RedisOptionsFactory,
		}),
	],

	exports: [MongooseModule, CacheModule],
})
export class GlobalModule {}
