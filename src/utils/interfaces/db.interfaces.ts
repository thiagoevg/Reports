import { Types } from 'mongoose'

export interface Options {
	findOne?: Boolean
	select?: string
	populateArray?: Array<Object>
	limit?: number
	sort?: Object
}
export interface Conditions {
	_id?: string | Types.ObjectId
}
