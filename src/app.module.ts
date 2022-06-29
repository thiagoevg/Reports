import { Module } from '@nestjs/common'
// IMPORTANTE: Importar esse modulo antes de qualuqer outra importação do projeto, pra evitar problemas com o env
import { GlobalModule } from './core/global.module'
// _________ Abaixo do modulo Global
import { SimpleAppModule } from './samples/simple-app/simple-app.module'
import { VenuesModule } from './samples/venues/venues.module'

//
@Module({
	imports: [GlobalModule, SimpleAppModule, VenuesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
