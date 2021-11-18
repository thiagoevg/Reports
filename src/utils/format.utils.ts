import { Injectable } from '@nestjs/common'

@Injectable()
export class Utils {
	constructor() {}
	priceToString(number: number): string {
		let retorno = number / 100
		return retorno.toString()
	}
}
