import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */
export enum ORDER_SHIPPING_PRICING_TYPE {
	Fixed = 'Fixed',
	Dynamic = 'Dynamic',
}

@Schema({ _id: false })
class OperationHours {
	@Prop()
	day: number
	@Prop()
	start: string
	@Prop()
	end: string
}
export const OperationHoursSchema = SchemaFactory.createForClass(OperationHours)

@Schema({ _id: false })
export class Pricing {
	@Prop()
	_id: 0
	@Prop({ enum: ORDER_SHIPPING_PRICING_TYPE })
	type: string
	@Prop()
	priceInCents: number
	@Prop()
	maxDistanceInMeters: number
}
export const PricingSchema = SchemaFactory.createForClass(Pricing)

@Schema({ _id: false })
export class Shipping {
	@Prop()
	_id: 0

	@Prop()
	averageShippingTimeText: string

	@Prop()
	distance: number

	@Prop({ type: () => PricingSchema })
	pricing: Array<Pricing>
}
export const ShippingSchema = SchemaFactory.createForClass(Shipping)

@Schema({ _id: false })
export class Delivery {
	@Prop()
	_id: 0
	@Prop({ required: true })
	disabled: Boolean
	@Prop({ type: ShippingSchema })
	shipping: Shipping
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery)

@Schema({
	collection: 'OrderSettings',
})
export class OrderSettings extends Document {
	@Prop({ type: DeliverySchema })
	delivery: Delivery

	@Prop({ type: [OperationHoursSchema] })
	operationHours: [OperationHours]

	@Prop({ type: Types.ObjectId, ref: 'Venues' })
	venue: Types.ObjectId

	@Prop({
		default: () => Date.now(),
	})
	created_at: Date

	@Prop({})
	updated_at: Date
}

export const OrderSettingsSchema = SchemaFactory.createForClass(OrderSettings)
