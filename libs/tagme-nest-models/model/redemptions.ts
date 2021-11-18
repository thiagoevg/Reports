import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Language } from './venues'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */
class Customer {
	@Prop()
	name: string
	@Prop()
	email: string
	@Prop()
	phone: string
	@Prop({ type: Types.ObjectId })
	customer: Types.ObjectId
}
@Schema({
	collection: 'Redemptions',
})
export class Redemptions extends Document {
	@Prop({ type: Types.ObjectId })
	_id: Types.ObjectId

	@Prop()
	customer: Customer

	@Prop()
	voucher: string
	@Prop({ default: () => Date.now() })
	created_at: Date

	@Prop({})
	updated_at: Date
}

export const RedemptionsSchema = SchemaFactory.createForClass(Redemptions)
