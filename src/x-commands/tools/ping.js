
/**
 * Returns the server's liveliness response.
 *
 * Complexity: O(1)
 * @generator
 * @yields {any[]} Redis command arguments including the command name.
 * @returns {"PONG"} Response from the Redis server.
 */
export function * ping() {
	return yield [ 'PING' ];
}
