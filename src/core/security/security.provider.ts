import { Provider } from '@nestjs/common'
import { KeysService } from './azure/key.service'

export const LOGGER_ENCRYPT_KEY_CREDENTIALS = 'LOGGER_ENCRYPT_KEY_CREDENTIALS'

export const LoggerEncryptKeyProvider: Provider = {
	provide: LOGGER_ENCRYPT_KEY_CREDENTIALS,

	useFactory: async (keyService: KeysService) => {
		const credentials = await keyService.getKey(process.env.PUBLIC_KEY_NAME)
		return credentials
			.split('\\n')
			.map(v => v.trim())
			.join('\n')
	},

	inject: [KeysService],
}
