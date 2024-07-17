/**
 * This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds instead of seconds.
 * - Available since: 2.6.0.
 * - Time complexity: O(1).
 * @param key Key to get.
 * @param seconds Time to live in seconds.
 * @param options Options. See ExpireOptionsJsdoc.
 * @returns -
 */
export function input(key, seconds, options) {
    const command_arguments = [
        'PEXPIRE',
        key,
        String(seconds),
    ];
    if (options) {
        if (options.NX) {
            command_arguments.push('NX');
        }
        if (options.XX) {
            command_arguments.push('XX');
        }
        if (options.GT) {
            command_arguments.push('GT');
        }
        if (options.LT) {
            command_arguments.push('LT');
        }
    }
    return [command_arguments];
}
