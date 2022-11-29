import { Injectable } from '@nestjs/common'
import { LoggerService } from '@tagmedev/tagme-nest-common';
import { Types } from 'mongoose'
import { VenuesRepository } from '../../repository/venuesRepository/venue.repository'


@Injectable()
export class TestService {

	constructor(private readonly loggerService: LoggerService) {
		this.loggerService.setContextToken(TestService.name);
	}

	async test() {
		const asyncLogger = await this.loggerService.createAsyncLogger();

		await new Promise(r => setTimeout(r, 10000));


		asyncLogger.enter("A")
		asyncLogger.info("TESTE")
		asyncLogger.enter("B")

		asyncLogger.dispatch("DETACHED");
	}
}

@Injectable()
export class VenuesService {

	constructor(
		private readonly venuesRepository: VenuesRepository, 
		private readonly loggerService: LoggerService,
		private readonly testService: TestService
	) {
		this.loggerService.setContextToken(VenuesService.name);
	}

	async getVenueEmail(venueId: string): Promise<string> {
		const venue = await this.venuesRepository.findOne({
			filter: {
				_id: new Types.ObjectId(venueId)
			},
			projection: {
				email: true
			},
		})
		
		this.loggerService.enter('findOne');
		this.loggerService.info(`email: ${venue.email}`)
		this.loggerService.exit();


		return venue.email;
	}
}
