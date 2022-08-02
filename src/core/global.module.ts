import { CacheModule, Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import environment from '../config/environment.config'
import { environmentSchema } from '../../environment/environmentSchema'
import { RedisOptionsFactory } from './cache-options.factory'
import { TagmeNestModelsModule } from '@tagmedev/tagme-nest-models'

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
		// after Config.forRoot(..)
		TagmeNestModelsModule.forLegacyRoot(process.env.LEGACY_MONGO_CONNECTION_NAME, {
			uri: 'legacyDatabase.uri',
			retryAttempts: 'database.retryAttempts',
			retryDelay: 'database.retryDelay',
		}),
		TagmeNestModelsModule.forMMRoot(process.env.MONGO_CONNECTION_NAME, {
			uri: 'MMDatabase.uri',
			retryAttempts: 'database.retryAttempts',
			retryDelay: 'database.retryDelay',
		}),

		CacheModule.registerAsync({
			useClass: RedisOptionsFactory,
		}),
	],

	exports: [TagmeNestModelsModule, CacheModule],
})
export class GlobalModule {}
