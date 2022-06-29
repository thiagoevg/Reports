import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { VenuesRepository } from '../../repository/venuesRepository/venue.repository'

@Injectable()
export class VenuesService {

  constructor(private readonly venuesRepository: VenuesRepository) {}

  async getVenueEmail(venueId: string): Promise<string> {

    const venue = await this.venuesRepository.findOne({
      filter: {_id: new Types.ObjectId(venueId)},
      projection: {
        email: true
      }
    })

    return venue.email.toString();
  }
}
