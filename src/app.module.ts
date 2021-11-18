import { Module } from '@nestjs/common'

import { AppController } from './app.controller'

import { AppService } from './app.service'

import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import environment from './config/environment.config'
import { DatabaseConfig } from './config/database.config'
import { environmentSchema } from '../environment/environmentSchema'

const { NODE_ENV } = process.env
const prod = !NODE_ENV || NODE_ENV === 'production'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: !prod ? `./environment/${process.env.NODE_ENV}.env` : '',
			isGlobal: true,
			load: [environment],
			validationSchema: environmentSchema,
		}),

		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useClass: DatabaseConfig,
		}),
		MongooseModule.forFeature([]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
