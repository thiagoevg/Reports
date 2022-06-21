import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Addresses } from './addresses'
import { Menus } from './menus'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */

export class BloominBrands {
	@Prop()
	storeCode: string
}
@Schema()
export class Language {
	@Prop({ required: true })
	pt: string
	@Prop()
	es?: string
	@Prop()
	en: string
	@Prop()
	fr?: string
}

export const LanguageSchema = SchemaFactory.createForClass(Language)

export type VenuesDocument = Venues & Document

@Schema({
	collection: 'Venues',
})
export class Venues {
	@Prop({ type: Types.ObjectId })
	_id: Types.ObjectId
	@Prop({ type: LanguageSchema, index: true })
	name: Language
	@Prop()
	channels: Array<Types.ObjectId>
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
	email: String
	@Prop()
	operationHours: Array<Object>
	@Prop()
	phone: Array<Object>

	@Prop({ ref: 'Menus', type: Types.ObjectId })
	menu: Array<Types.ObjectId>
	@Prop({
		default: () => Date.now(),
	})
	created_at: Date

	@Prop()
	bloominBrands: BloominBrands

	@Prop({})
	updated_at: Date
}

export const VenuesSchema = SchemaFactory.createForClass(Venues)
