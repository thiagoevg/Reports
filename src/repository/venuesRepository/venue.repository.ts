import { Injectable } from '@nestjs/common'
import { Venues, VenuesDocument } from '@tagmedev/tagme-nest-models'
import { Model } from 'mongoose'
import { InjectLegacyModel } from '../../core/legacyDatabase-options.factory'
import { FindProps, UpdateProps } from '../../repository/interfaces.repositories'

@Injectable()
export class VenuesRepository {
	constructor(@InjectLegacyModel(Venues.name) private readonly venuesModel: Model<VenuesDocument>) {}

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
