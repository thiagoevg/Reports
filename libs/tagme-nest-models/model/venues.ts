import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Addresses } from './addresses'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */

@Schema()
export class Language {
	@Prop({ required: true })
	pt: string
	@Prop()
	es?: string
	@Prop()
	en?: string
	@Prop()
	fr?: string
}

@Schema()
export class ShippingPartners {
	@Prop()
	uberDirect?: string
}

export const ShippingPartnersSchema = SchemaFactory.createForClass(ShippingPartners)

export enum VENUE_STATUS {
	AVAILABLE = 'AVAILABLE',
	UNAVAILABLE = 'UNAVAILABLE',
	NOT_CONFIGURED = 'NOT_CONFIGURED'
}

export const LanguageSchema = SchemaFactory.createForClass(Language)

@Schema({
	collection: 'Venues',
})
export class Venues extends Document {
	@Prop({ type: Types.ObjectId })
	_id: Types.ObjectId

	@Prop({ type: LanguageSchema, index: true })
	name: Language
	@Prop({ type: LanguageSchema })
	descript: Language
	@Prop({ type: LanguageSchema })
	shortDescript: Language
	@Prop({ type: LanguageSchema })
	shortName: Language
	@Prop()
	location: number
	// Modelo para usar de propriedades populadas
	@Prop({ ref: 'Addresses', enum: [Addresses, Types.ObjectId] })
	address: Addresses
	@Prop()
	email: string
	@Prop()
	operationHours: Array<Object>
	@Prop()
	phone: Array<Object>
	@Prop()
	marketplaceMerchantIds: Map<string, string>
	@Prop({ type: ShippingPartnersSchema })
	shippingPartners: ShippingPartners

	@Prop({ default: () => Date.now() })
	created_at: Date

	@Prop({})
	updated_at: Date
}

export const VenuesSchema = SchemaFactory.createForClass(Venues)
