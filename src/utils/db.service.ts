import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { Conditions, Options } from './interfaces/db.interfaces'

@Injectable()
export class DBService {
	constructor() {}

	async query(modelInstance: Model<any>, conditions: Object, opts: Options): Promise<any> {
		let query = modelInstance.find(conditions)
		if (opts) {
			if (opts.findOne) query = modelInstance.findOne(conditions)
			if (opts.select) query.select(opts.select)
			if (opts.populateArray) {
				opts.populateArray.forEach(populate => query.populate(populate))
			}
			if (opts.limit) query.limit(opts.limit)
			if (opts.sort) query.sort(opts.sort)
		}

		return query.lean().exec()
	}

	async exists(modelInstance: Model<any>, conditions: Object): Promise<boolean> {
		return modelInstance.exists(conditions)
	}

	async save(
		modelInstance: Model<any>,
		conditions: Conditions | any,
		saveObj: Object,
		returnQueryOpts: Options
	): Promise<Object> {
		// TODO : Analisar se vale colocar esse Object Id aqui
		if (conditions._id) {
			const _id = <string>conditions._id
			conditions = { _id: new Types.ObjectId(_id) }
		}
		const save = modelInstance.findOneAndUpdate(conditions, saveObj, {
			new: true,
			upsert: true,
			runValidators: true,
			setDefaultsOnInsert: true,
			useFindAndModify: false,
		})
		if (returnQueryOpts) {
			if (returnQueryOpts.select) save.select(returnQueryOpts.select)
			if (returnQueryOpts.populateArray) {
				returnQueryOpts.populateArray.forEach(populate => save.populate(populate))
			}
			if (returnQueryOpts.sort) save.sort(returnQueryOpts.sort)
		}

		return save.lean().exec()
	}
}
