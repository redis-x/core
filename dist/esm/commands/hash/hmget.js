/**
 * Returns the values associated with fields in the hash stored at key.
 * - Available since: 2.0.0.
 * - Time complexity: O(N) where N is the number of fields being requested.
 * @param key -
 * @param fields -
 * @returns An object with requested keys and their values.
 */
export function HMGET(key, ...fields) {
	const fields_string = fields.map(String);
	return {
		kind: "#schema",
		args: ["HMGET", key, ...fields_string],
		replyTransform: replyTransform.bind(fields_string),
	};
}
// eslint-disable-next-line jsdoc/require-jsdoc
export function replyTransform(result) {
	const output = {};
	for (const [index, field] of this.entries()) {
		const value = result[index];
		if (value !== undefined) {
			output[field] = value;
		}
	}
	return output;
}
