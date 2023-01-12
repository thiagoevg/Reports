import { Controller, Get, Param } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'
import { VenuesService } from './venues.service'

@Controller('venues')
export class VenuesController {
	constructor(private readonly venuesService: VenuesService) {}

	@Get('email/:venueId')
	@ApiParam({ name: 'venueId', example: '572259faf1fb67ed11c1695a' })
	getVenueEmail(@Param('venueId') venueId: string) {
		return this.venuesService.getVenueEmail(venueId)
	}

	@Get('log-encrypted-sample/:venueId')
	@ApiParam({ name: 'venueId', example: '572259faf1fb67ed11c1695a' })
	logEncryptedLogSample(@Param('venueId') venueId: string) {
		return this.venuesService.logEncryptedLogSample(venueId)
	}
}
