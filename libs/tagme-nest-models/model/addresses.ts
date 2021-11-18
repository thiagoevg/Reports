import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */

@Schema({
	collection: 'Addresses',
})
export class Addresses extends Document {
	@Prop({ type: Types.ObjectId })
	_id: { type: Types.ObjectId }
	@Prop()
	address1: string
	@Prop()
	address2: string
	@Prop()
	backingId: number
	@Prop()
	city: string
	@Prop()
	country: string
	@Prop()
	location: Array<number>
	@Prop()
	neighborhood: string
	@Prop()
	number: string
	@Prop()
	reference: string
	@Prop()
	state: string
	@Prop()
	zip: string
	@Prop({ default: () => Date.now() })
	created_at: Date

	@Prop({})
	updated_at: Date
}

export const AddressesSchema = SchemaFactory.createForClass(Addresses)
