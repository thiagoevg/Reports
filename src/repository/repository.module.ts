import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TagmeNestModelsModule } from '@tagmedev/tagme-nest-models'
import { VenuesRepository } from './venuesRepository/venue.repository'

@Module({
	// OBS: Não realizar nenhuma configuração por aqui, por exemplo: MongooseModule.forRootAsync({...
	//      Caso este projeto seja usado como exemplo, siga o mesmo padrão, removendo todas as configurações de todos modulos que não sejam o global.
	imports: [
		// Providencie somente os models

		// Features for Legacy
		TagmeNestModelsModule.forLegacyFeatures(),

		// Features for Menu Manager
		TagmeNestModelsModule.forMMFeatures(),
	],
	providers: [VenuesRepository],
	exports: [VenuesRepository],
})
export class RepositoryModule {}
