
/**
 * @preserve
 * @typedef {string | number | ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | import('buffer').Buffer} RedisXCommandArgument
 */

/**
 * Converts all arguments to strings.
 * @param {string} command Command name.
 * @param {RedisXCommandArgument[]} args Command arguments.
 * @returns {(string | Buffer)[]} -
 */
export function updateArguments(command, args) {
	for (const [ index, argument ] of args.entries()) {
		if (
			typeof argument === 'number'
			&& Number.isNaN(argument) !== true
		) {
			args[index] = String(argument);
		}
		else if (Buffer.isBuffer(argument)) {
			args[index] = argument;
		}
		else if (argument instanceof ArrayBuffer) {
			args[index] = Buffer.from(argument);
		}
		else if (
			argument instanceof Int8Array
			|| argument instanceof Uint8Array
			|| argument instanceof Uint8ClampedArray
			|| argument instanceof Int16Array
			|| argument instanceof Uint16Array
			|| argument instanceof Int32Array
			|| argument instanceof Uint32Array
			|| argument instanceof Float32Array
			|| argument instanceof Float64Array
			|| argument instanceof BigInt64Array
		) {
			args[index] = Buffer.from(argument.buffer);
		}
		else if (typeof argument !== 'string') {
			const error = new TypeError(
				`Argument #${index + 1} of command "${command}" must be a string, non-NaN number, ArrayBuffer, TypedArray or NodeJS Buffer.`,
			);

			error.command = command;
			error.arguments = args;

			throw error;
		}
	}

	return args;
}
