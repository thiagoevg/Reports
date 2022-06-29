import { Inject, Injectable } from '@nestjs/common'
import { getModelToken, MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'


// It's used to generate token for MenuManager Models
export const getMMModelToken = (model) => getModelToken(model, process.env.MONGO_CONNECTION_NAME);

// It's used to annotate the MenuManager Models
export const InjectMMModel = (model: string) => Inject(getMMModelToken(model));

@Injectable()
export class DatabaseOptionsFactory implements MongooseOptionsFactory {
	constructor(private configService: ConfigService) {}

	createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
		const database = this.configService.get('database')
		const mm = this.configService.get('MMDatabase')
		
		// Top level connectionName it's not being supported on version: 9.1.1
		// The connection name is provided in the global module
		return { ...database, uri: mm.uri }
	}
}
