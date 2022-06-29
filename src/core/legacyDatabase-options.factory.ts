import { Inject, Injectable } from '@nestjs/common'
import { getModelToken, MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

// It's used to generate token for Legacy Models
export const getLegacyModelToken = (model) => getModelToken(model, process.env.LEGACY_MONGO_CONNECTION_NAME);

// It's used to annotate the Legacy Models
export const InjectLegacyModel = (model: string) => Inject(getLegacyModelToken(model));

@Injectable()
export class LegacyDatabaseOptionsFactory implements MongooseOptionsFactory {
	constructor(private configService: ConfigService) {}

	createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
		const database = this.configService.get('database')
		const legacy = this.configService.get('legacyDatabase')
		
		// Top level connectionName it's not being supported on version: 9.1.1
		// The connection name is provided in the global module
		return { ...database, uri: legacy.uri }
	}
}
