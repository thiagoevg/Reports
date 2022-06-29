import { Module } from '@nestjs/common'
import { SimpleAppController } from './simple-app.controller'
import { SimpleAppService } from './simple-app.service'
//
@Module({
	imports: [],
	controllers: [SimpleAppController],
	providers: [SimpleAppService],
})
export class SimpleAppModule {}
