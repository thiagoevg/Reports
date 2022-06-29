import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common'
import { Cache, CachingConfig } from 'cache-manager'

@Injectable()
export class CacheService {
	constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

	async get(key: string) {
		return await this.cache.get(key)
	}

	async delete(key: string) {
		return await this.cache.del(key)
	}

	/**
	 *
	 * @param key
	 * @param value
	 * @param options In seconds
	 * @returns
	 */
	async set(key: string, value: any, options?: CachingConfig) {
		return await this.cache.set(key, value, options)
	}
}
