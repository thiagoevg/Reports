import { Venues } from '@tagmedev/tagme-nest-models'
import { Types } from 'mongoose'

// Classe utilizada para gerar esboços de todos os tipos para os testes
export class StubFactory {
	// Cria um esboço para ser utilizado nos testes dos venues
	static createForVenue(): Venues {
		return {
			_id: new Types.ObjectId('572259faf1fb67ed11c1695a'),
			email: 'sante13restaurante@gmail.com',
		} as any
	}
}
