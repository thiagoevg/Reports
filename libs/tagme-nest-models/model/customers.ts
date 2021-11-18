import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */

@Schema({
	collection: 'Customers',
})
export class Customers extends Document {
	@Prop({ type: Types.ObjectId })
	_id: Types.ObjectId
	@Prop()
	cpf: string

	@Prop()
	name: string
	@Prop()
	lastName: string
	@Prop()
	phone: string
	@Prop()
	email: string
	@Prop()
	disabled: Boolean

	@Prop()
	venues: Array<Types.ObjectId | string>

	@Prop({ default: () => Date.now() })
	created_at: Date

	@Prop({})
	updated_at: Date
}

export const CustomersSchema = SchemaFactory.createForClass(Customers)
