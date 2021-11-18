import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Language } from './venues'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */

@Schema({
	collection: 'Payments',
})
export class Payments extends Document {
	@Prop({ type: Types.ObjectId })
	_id: Types.ObjectId

	@Prop({ default: () => Date.now() })
	created_at: Date

	@Prop({})
	updated_at: Date
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments)
