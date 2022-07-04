import { Injectable } from '@nestjs/common'

@Injectable()
export class SimpleAppService {
	getHello(): string {
		return 'Hello World!'
	}
}
