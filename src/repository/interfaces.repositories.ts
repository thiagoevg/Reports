import { FilterQuery, QueryOptions, Types, UpdateQuery } from 'mongoose'

export interface FindProps<Model, ModelDocument> {
	filter?: FilterQuery<ModelDocument>
	// Partial: Constructs a type with all properties of Type set to optional.
	// The keyof operator takes an object type and produces a string or numeric literal union of its keys.
	// Record: Constructs an object type whose property keys are Keys and whose property values are Type.
	projection?: Partial<Record<keyof Model, boolean>> & hasIdProjection
	sort?: Partial<Record<keyof Model, 'asc' | 'desc'>>
	limit?: number
}

interface hasIdProjection {
	_id?: boolean
}

export interface UpdateProps<Model, ModelDocument> {
	filter?: FilterQuery<ModelDocument>
	update: UpdateQuery<Model>
	projection?: Partial<Record<keyof Model, boolean>> & hasIdProjection
	remove?: Partial<Record<keyof Model, any>>
	opts?: QueryOptions
}
