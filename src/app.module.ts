import { Module } from '@nestjs/common'

import { AppController } from './app.controller'

import { AppService } from './app.service'

import { ConfigModule } from '@nestjs/config'
import environment from './config/environment.config'
import { environmentSchema } from '../environment/environmentSchema'
import { RepositoryModule } from './repository/repository.module'
import { VenuesController } from './venues/venues.controller';
import { VenuesService } from './venues/venues.service';

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

		RepositoryModule,
	],
	controllers: [AppController, VenuesController],
	providers: [AppService, VenuesService],
})
export class AppModule {}
