import { Injectable } from '@nestjs/common'
import { Orders } from '../../../libs/tagme-nest-models/model/order'
import { Model } from 'mongoose'
import { InjectLegacyModel } from '../../core/legacyDatabase-options.factory'

@Injectable()
export class OrdersRepository {
	constructor(@InjectLegacyModel(Orders.name) private readonly ordersModel: Model<Orders>) {}
}
