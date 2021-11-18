import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Addresses } from './addresses'
import { Customers } from './customers'
import { Payments } from './payments'
import { Language, Venues } from './venues'

/*
 * Main references for building this:
 * https://docs.nestjs.com/techniques/mongodb
 * https://mongoosejs.com/docs/schematypes.html
 */

export enum MARKETPLACE {
	Ifood = 'ifood',
	UberEats = 'ubereats',
	Tagme = 'tagme',
}
export enum ORDER_STATUS {
	Canceled = 'Canceled',
	Received = 'Received',
	Paid = 'Paid',
	PaymentDeclined = 'PaymentDeclined',
	PaymentRefunded = 'PaymentRefunded',
	Accepted = 'Accepted',
	InTheKitchen = 'InTheKitchen',
	ReadyForPickUp = 'ReadyForPickUp',
	OutForDelivery = 'OutForDelivery',
	VendorDelivery = 'VendorDelivery',
	Delivered = 'Delivered',
	Rejected = 'Rejected',
}

export enum ORDER_TYPE {
	Delivery = 'Delivery',
	Takeaway = 'Takeaway',
	FastOrdering = 'FastOrdering',
}

export enum SHIPPING_STATUS {
	Created = 'created',
	Accepted = 'accepted',
	Cancelled = 'Cancelled',
	OnTheWayToPickup = 'onTheWayToPickup',
	OnTheWayToDeliver = 'onTheWayToDeliver',
	Delivered = 'delivered',
	Failed = 'failed',
}

export const STATUS_FOR_PUSHER = [
	ORDER_STATUS.Paid,
	ORDER_STATUS.Accepted,
	ORDER_STATUS.InTheKitchen,
	ORDER_STATUS.ReadyForPickUp,
	ORDER_STATUS.OutForDelivery,
	ORDER_STATUS.VendorDelivery,
]

export enum VoucherSponsor {
	Venue = 'venue',
	Marketplace = 'marketplace',
}

export class VoucherSponsorship {
	sponsor: VoucherSponsor
	amount: number
}

export class Voucher {
	sponsorships: VoucherSponsorship[]
	amount: number
	targetId?: string
	target?: string
}

class Sons {
	name: Language
	price: number
	promoPrice: number
	quantity: number
}
class SelectedOptions {
	name: Language
	sons: Array<Sons>
}
export enum ORDER_OPTIONS {
	AcceptOrder = 'confirmOrder',
	AcceptCancelation = 'acceptCancelation',
	DenyCancelation = 'denyCancelation',
	RequestCancelation = 'requestCancelation',
	FinishOrder = 'finishOrder',
}

export class OrderEvent {
	id: string
	payload: Object
}

export class MarketplaceCustomer {
	name: string
	document?: string
	phone: string
	phoneCode: string
}

export enum PaymentMethod {
	Cash = 'cash',
}

export class CashInfo {
	changeFor: number
}

export class CardInfo {
	brand: string
}

export class Charge {
	public amount: number
	public method?: PaymentMethod
	public cashInfo?: CashInfo
	public cardInfo?: CardInfo
}

export class OrderCharges {
	public total: number
	public chargeable: Charge
	public prepaid: Charge
}

export class ItemOption {
	public name: string
	public options: Items[]
}

class Items {
	@Prop()
	name: Language

	@Prop()
	descript: Language

	@Prop()
	avatarUrl: string

	@Prop()
	quantity: number

	@Prop({ type: Types.ObjectId })
	menuItem?: Types.ObjectId

	@Prop({ type: Types.ObjectId })
	menu?: Types.ObjectId

	@Prop()
	promoPriceInCents: number
	@Prop()
	priceInCents: number
	@Prop()
	subItems: Array<Types.ObjectId>

	@Prop()
	selectedOptions?: Array<SelectedOptions>

	@Prop()
	obs: string
}

export class ShoppingCart {
	@Prop()
	priceInCents: number
	@Prop()
	promoPriceInCents: number
	@Prop()
	voucherDiscountInCents: number
	@Prop()
	items: Array<Items>
}

class Vendor {
	@Prop()
	name: string
	@Prop()
	priceInCents: number
	@Prop({ enum: SHIPPING_STATUS })
	status?: string
	@Prop()
	statusCodeDisplay?: string
	@Prop()
	trackingUrl?: string
	@Prop()
	estimatedTimeToDelivery: Date
	@Prop()
	statusCode: number
	@Prop()
	trackingCode?: string
	@Prop()
	vendorPackageId: number
	@Prop()
	vendorShippingId: number
}

export class Shipping {
	@Prop()
	address: Addresses

	@Prop()
	vendor: Vendor

	@Prop()
	pricingType?: string

	@Prop()
	priceInCents?: number

	@Prop()
	deliverAt?: string
}

@Schema({
	collection: 'Orders',
})
export class Orders extends Document {
	@Prop({ type: Types.ObjectId })
	_id: Types.ObjectId | string

	@Prop({ default: () => Date.now() })
	created_at: Date

	@Prop({ ref: Addresses.name, type: Types.ObjectId })
	address: Addresses

	@Prop({ ref: Customers.name, type: Types.ObjectId })
	customer: Customers

	@Prop()
	logs: Array<Object>

	@Prop()
	events: OrderEvent[]

	@Prop()
	marketplaceCustomer?: MarketplaceCustomer

	@Prop()
	marketplace?: MARKETPLACE

	@Prop()
	displayId?: string

	@Prop()
	marketplaceOrderId?: string

	@Prop({ type: Types.Map })
	marketplaceOrder?: Object

	@Prop({ ref: Payments.name, type: Types.ObjectId })
	payments: Types.ObjectId

	@Prop()
	charges: OrderCharges

	@Prop()
	receivedAt?: Date

	@Prop()
	outForDeliveryAt?: Date

	@Prop()
	inTheKitchenAt?: Date

	@Prop()
	readyForPickUpAt?: Date

	@Prop()
	rejectedAt?: Date

	@Prop()
	deliveredAt?: Date

	@Prop()
	canceledAt?: Date

	@Prop()
	acceptedAt?: Date

	@Prop()
	redemptions: Array<Object>

	@Prop({ type: Object })
	shipping: Shipping

	@Prop()
	shoppingCart: ShoppingCart

	@Prop({ enum: ORDER_STATUS })
	status: string

	@Prop({ enum: ORDER_TYPE })
	type: string

	@Prop({ type: Types.ObjectId, ref: 'Venues' })
	venue: Venues

	@Prop()
	invoiceCpf: string

	@Prop({})
	updated_at: Date

	@Prop({ type: Object })
	vouchers?: Voucher[]

	// TODO: Remover esse campo após ajuste no front para usar o valor dentro do shoppingCart
	@Prop({ type: Number })
	voucherTotal?: number = 0

	@Prop({ type: Number })
	deliveryFee: number

	@Prop()
	obs: string
}

export const OrdersSchema = SchemaFactory.createForClass(Orders)
