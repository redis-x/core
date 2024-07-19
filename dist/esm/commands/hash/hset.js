// eslint-disable-next-line jsdoc/require-jsdoc
export function input(key, arg1, arg2) {
	const command_arguments = ["HSET", key];
	if (typeof arg1 === "string") {
		command_arguments.push(arg1, String(arg2));
	} else {
		for (const [field, value] of Object.entries(arg1)) {
			command_arguments.push(field, String(value));
		}
	}
	return [command_arguments];
}
