import { Module } from '@nestjs/common'
import { KeysService } from './azure/key.service'
import { LoggerEncryptKeyProvider, LOGGER_ENCRYPT_KEY_CREDENTIALS } from './security.provider'

@Module({
	imports: [],
	controllers: [],
	providers: [LoggerEncryptKeyProvider, KeysService],
	exports: [LoggerEncryptKeyProvider],
})
export class SecurityModule {}
