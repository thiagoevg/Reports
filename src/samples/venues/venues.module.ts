import { Module } from '@nestjs/common'
import { RepositoryModule } from '../../repository/repository.module'
import { VenuesController } from './venues.controller'
import { VenuesService } from './venues.service'

//
@Module({
	imports: [RepositoryModule],
	controllers: [VenuesController],
	providers: [VenuesService],
})
export class VenuesModule {}
