import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectLegacyModel, Venues, Waitlists } from '@tagmedev/tagme-nest-models'

// Models
@Injectable()
export class WaitlistsRepository {
	constructor(@InjectLegacyModel(Waitlists.name) private waitlistsModel: Model<Waitlists>) {}

	async getById(waitlistId: Types.ObjectId): Promise<Waitlists> {
		return await this.waitlistsModel.findById(waitlistId)
	}
}
