import { Module } from '@nestjs/common'
import { TagmeNestModelsService } from './tagme-nest-models.service'

@Module({
	providers: [TagmeNestModelsService],
	exports: [TagmeNestModelsService],
})
export class TagmeNestModelsModule {}
