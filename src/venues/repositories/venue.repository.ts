import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Venues, VenuesDocument } from '../../../libs/tagme-nest-models/model/venues'
import { FindProps, UpdateProps } from '../../repository/interfaces.repositories'

@Injectable()
export class VenuesRepository {
	constructor(@InjectModel(Venues.name) private readonly venuesModel: Model<VenuesDocument>) {}

	async findOne({ filter, projection, sort }: FindProps<Venues, VenuesDocument>) {
		return await this.venuesModel.findOne(filter).select(projection).sort(sort).lean()
	}
	async find({ filter, projection, sort }: FindProps<Venues, VenuesDocument>) {
		return await this.venuesModel.find(filter).select(projection).sort(sort).lean()
	}
	async findOneAndUpdate({ filter, update, projection }: UpdateProps<Venues, VenuesDocument>) {
		return await this.venuesModel
			.findOneAndUpdate(filter, update, { useFindAndModify: false, new: true, upsert: true })
			.select(projection)
			.lean()
	}
}
