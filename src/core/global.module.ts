import { CacheModule, Global, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import environment from '../config/environment.config'
import { environmentSchema } from '../../environment/environmentSchema'
import { RedisOptionsFactory } from './cache-options.factory'
import { TagmeNestModelsModule } from '@tagmedev/tagme-nest-models'
import { IncomingMessage, ServerResponse } from 'http'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { GlobalExceptionFilter } from './global-exception.filter'
import { GlobalInterceptor } from './global-http-interceptor'
import {
	LoggerDispatchStrategy,
	LoggerLevelStrategy,
	LoggerModule,
	LoggerOnErrorStrategy,
	LoggerParams,
} from '@tagmedev/tagme-nest-common'

//
const { NODE_ENV } = process.env
const prod = !NODE_ENV || NODE_ENV === 'production'

@Global()
@Module({
	imports: [
		// Deve ser o primeiro dessa lista (ele que vai providenciar as envs)
		ConfigModule.forRoot({
			envFilePath: !prod ? `./environment/${process.env.NODE_ENV}.env` : '',
			isGlobal: false,
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

		//
		LoggerModule.forRootAsync({
			isGlobal: false,
			useFactory: (config: ConfigService): LoggerParams => {
				return {
					/** don't change this */
					pinoHttp: {
						level: !prod ? 'trace' : 'info',
					},

					// You can change this
					contextBundle: {
						strategy: {
							onDispatch: LoggerDispatchStrategy.DISPATCH,
							level: LoggerLevelStrategy.MAJOR_LEVEL,
							onError: LoggerOnErrorStrategy.DISPATCH,
						},

						stream: {
							datadogApiKey: config.get('datadog.apiKey'),
						},
					},
				}
			},
			inject: [ConfigService],
		}),
	],

	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: GlobalInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: GlobalExceptionFilter,
		},
	],

	exports: [ConfigModule, TagmeNestModelsModule, CacheModule, LoggerModule],
})
export class GlobalModule {}
