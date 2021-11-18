import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Language } from './venues'

@Schema()
class Sons {
	_id: string | Types.ObjectId
	name: Language
	order: number
	price: number
	promoPrice: number
	relativePrice: Boolean
	relativePromoPrice: Boolean
	disabled: Boolean
}

@Schema()
class Options {
	_id: string | Types.ObjectId
	name: Language
	descript: Language
	price: number
	promoPrice: number
	relativePrice: Boolean
	relativePromoPrice: Boolean

	volume: string
	barcodes: Array<any>
	backingId: string
	disabled: Boolean
	featured: Boolean
	details: Object
	order: number
	sons: [Sons]
	max: number // maximum number of optionItems that may be selected
	min: number // minimum number of optionItems that may be selected
}

@Schema({
	collection: 'MenuItems',
})
export class MenuItems extends Document {
	@Prop({ type: Types.ObjectId })
	_id: Types.ObjectId
	@Prop()
	name: Language
	@Prop()
	descript: Language
	@Prop()
	avatarUrl: string
	@Prop()
	disabled: boolean
	@Prop({ default: () => Date.now() })
	created_at: Date
	@Prop()
	price: number
	@Prop()
	promoPrice: number

	@Prop()
	subItems: [Types.ObjectId]

	@Prop()
	options?: [Options]
	@Prop({})
	updated_at: Date
}

export const MenuItemsSchema = SchemaFactory.createForClass(MenuItems)
