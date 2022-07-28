import { Injectable } from '@nestjs/common'
import { InjectLegacyModel, Orders } from '@tagmedev/tagme-nest-models'
import { Model } from 'mongoose'

@Injectable()
export class OrdersRepository {
	constructor(@InjectLegacyModel(Orders.name) private readonly ordersModel: Model<Orders>) {}
}
