// eslint-disable-next-line jsdoc/require-jsdoc
export function input(key, arg1, ...args) {
	let elements = [];
	if (typeof arg1 === "string") {
		elements = args;
		elements.unshift(arg1);
	} else if (Array.isArray(arg1)) {
		elements = arg1;
	} else {
		elements = [...arg1];
	}
	return [["LPUSH", key, ...elements]];
}
