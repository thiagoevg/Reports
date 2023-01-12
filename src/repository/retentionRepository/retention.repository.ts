import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectLegacyModel, RetentionResumes, Retentions } from '@tagmedev/tagme-nest-models'

// Models
@Injectable()
export class RetentionRepository {
	constructor(
		@InjectLegacyModel(Retentions.name) private retentionModel: Model<Retentions>,
		@InjectLegacyModel(RetentionResumes.name) private retentionResumeModel: Model<RetentionResumes>
	) {}

	async getByVenueId(venueId: Types.ObjectId): Promise<Retentions> {
		return await this.retentionModel.findOne({
			venue: venueId,
		})
	}

	async getById(retentionId: Types.ObjectId): Promise<Retentions> {
		return await this.retentionModel.findById(retentionId)
	}

	async updateResume(retentionResume: RetentionResumes) {
		return await this.retentionResumeModel.findOneAndUpdate(
			{
				waitlist: retentionResume.waitlist.toString(),
			},
			retentionResume,
			{
				upsert: true,
				new: true,
			}
		)
	}

	async getRealRetentionResumes() {
		return await this.retentionResumeModel.aggregate(
			[
				{
					'$match': {
						'sentAt': {
							'$exists': true
						}
					}
				}, {
					'$project': {
						'customer': {
							'$toObjectId': '$customer'
						}, 
						'waitlist': {
							'$toObjectId': '$waitlist'
						}, 
						'enviado': '$sentAt', 
						'mensagem': '$msgSent'
					}
				}, {
					'$lookup': {
						'from': 'Customers', 
						'localField': 'customer', 
						'foreignField': '_id', 
						'as': 'customer'
					}
				}, {
					'$lookup': {
						'from': 'Waitlists', 
						'localField': 'waitlist', 
						'foreignField': '_id', 
						'as': 'waitlist'
					}
				}, {
					'$unwind': {
						'path': '$customer'
					}
				}, {
					'$unwind': {
						'path': '$waitlist'
					}
				}, {
					'$project': {
						'user': {
							'firstName': '$customer.name', 
							'lastName': '$customer.lastName'
						}, 
						'customer': '$customer._id',
						'waitlist': '$waitlist._id',
						'venue': '$waitlist.venue', 
						'numero': '$customer.phone', 
						'enviado': 1, 
						'mensagem': 1
					}
				}, {
					'$lookup': {
						'from': 'Venues', 
						'localField': 'venue', 
						'foreignField': '_id', 
						'as': 'venue'
					}
				}, {
					'$unwind': {
						'path': '$venue'
					}
				},
				{
					'$match':{
						'venue.bloominBrands':{$exists:true}
					}
				},
				{
					'$project': {
						'customer': 1,
						'waitlist': 1,
						'user': 1, 
						'venue': {
							'name': '$venue.name.pt', 
							'bloominBrands': 1
						}, 
						'numero': 1, 
						'enviado': 1, 
						'mensagem': 1
					}
				}
			]
		);
	}

	async getRestrictedRetentionResumes(customerIds: string[], waitlistIds: string[], nextTo: Date) {
		return await this.retentionResumeModel.aggregate(
			[
				{
					$match: {
						sentAt: {
							'$exists': false
						}, 
						removeReason: 'Seat', 
						customer: {
							$nin: customerIds
						},
						waitlist: {
							$nin: waitlistIds
						}
					}
				},
				{
					'$group': {
						'_id': '$waitlist', 
						'resume': {
							'$first': '$_id'
						}, 
						'customer': {
							'$first': '$customer'
						}, 
						'waitlist': {
							'$first': '$waitlist'
						}, 
						'enviado': {
							'$first': '$removedAt'
						}, 
						'mensagem': {
							'$first': '$msgSent'
						}
					}
				}, 
				{
					$project: {
						_id: '$resume',
						customer: {
							'$toObjectId': '$customer'
						},
						waitlist: {
							'$toObjectId': '$waitlist'
						},
						enviado: 1,
						mensagem: 1,
						dateDifference: { 
							$abs: {
								$subtract: ["$enviado", nextTo] 
							}
						}
					}
				},
				{
					$sort: {
						dateDifference: 1
					}
				},
				{
					$lookup: {
						'from': 'Customers', 
						'localField': 'customer', 
						'foreignField': '_id', 
						'as': 'customer'
					}
				}, 
				{
					$lookup: {
						'from': 'Waitlists', 
						'localField': 'waitlist', 
						'foreignField': '_id', 
						'as': 'waitlist'
					}
				}, 
				{
					'$unwind': {
						'path': '$customer'
					}
				}, 
				{
					'$unwind': {
						'path': '$waitlist'
					}
				},
				{
					'$project': {
						'user': {
							'firstName': '$customer.name', 
							'lastName': '$customer.lastName'
						}, 
						'customer': '$customer._id',
						'waitlist': '$waitlist._id',
						'venue': '$waitlist.venue', 
						'numero': '$customer.phone', 
						'enviado': 1, 
						'mensagem': 1,
						'dateDifference': 1
					}
				}, {
					'$lookup': {
						'from': 'Venues', 
						'localField': 'venue', 
						'foreignField': '_id', 
						'as': 'venue'
					}
				}, {
					'$unwind': {
						'path': '$venue'
					}
				}, {
					'$project': {
						'customer': 1,
						'waitlist': 1,
						'user': 1, 
						'venue': {
							'name': '$venue.name.pt', 
							'bloominBrands': 1
						}, 
						'numero': 1, 
						'enviado': 1, 
						'mensagem': 'Ei, que bom te ver por aqui! Por favor, aguarde mais um pouco e logo você curtirá seu #MomentoOutback.',
						'dateDifference': 1
					}
				}, {
					'$limit': 4
				}
			]
		)
	}

	async getResumeByWaitlistId(waitlistId: string): Promise<RetentionResumes> {
		return await this.retentionResumeModel.findOne({
			waitlist: waitlistId,
		})
	}
}
