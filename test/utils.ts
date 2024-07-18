
/**
 * Creates a random key for Redis.
 * @returns Random key.
 */
export function createRandomKey(): string {
	return 'key:' + Math.random().toString(36).slice(2, 12);
}
