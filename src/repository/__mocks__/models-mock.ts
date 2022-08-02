import { Orders, Venues } from '@tagmedev/tagme-nest-models';
import { ModelMock } from './model-mock'

// Mocks opcionais para tipagens

// Utilizado para embrulhar os modelos genericos, para um melhor entendimento ler a explicação localizada em "./model-mocks.ts"
// Adicionar aqui os mocks de todos modelos como no exemplo abaixo
export class VenuesMock extends ModelMock<Venues> {}
export class OrdersMock extends ModelMock<Orders> {}
