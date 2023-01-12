import { Injectable } from '@nestjs/common'
import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'
import { ConfigService } from '@nestjs/config'

interface KeyvaultConfig {
	url: string
}

@Injectable()
export class KeysService {
	private keysConfig: KeyvaultConfig

	constructor(private readonly configService: ConfigService) {
		this.keysConfig = this.configService.get<KeyvaultConfig>('keyvault')
	}

	async getKey(keyName: string): Promise<string> {
		const credential = new DefaultAzureCredential()
		const client = new SecretClient(this.keysConfig.url, credential)
		const retrievedKey = await client.getSecret(keyName)
		return Buffer.from(retrievedKey.value, 'utf8').toString()
	}
}
