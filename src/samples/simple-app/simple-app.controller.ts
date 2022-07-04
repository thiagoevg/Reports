import { Controller, Get } from '@nestjs/common'
import { SimpleAppService } from './simple-app.service'

@Controller()
export class SimpleAppController {
	constructor(private readonly appService: SimpleAppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}
}
