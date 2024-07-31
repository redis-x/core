import { dummyReplyTransform } from "../../utils";
// eslint-disable-next-line jsdoc/require-jsdoc
export function ZRANGE(key, start, stop, options) {
	const args_options = [];
	if (options) {
		if (options.REV) {
			args_options.push("REV");
		}
		if (options.BYSCORE) {
			args_options.push("BYSCORE");
		}
		if (options.BYLEX) {
			args_options.push("BYLEX");
		}
		if (options.LIMIT) {
			args_options.push(
				"LIMIT",
				String(options.LIMIT[0]),
				String(options.LIMIT[1]),
			);
		}
		if (options.WITHSCORES) {
			args_options.push("WITHSCORES");
		}
	}
	return {
		kind: "#schema",
		args: ["ZRANGE", key, String(start), String(stop), ...args_options],
		replyTransform: options?.WITHSCORES
			? replyWithscoresTransform
			: dummyReplyTransform,
	};
}
// eslint-disable-next-line jsdoc/require-jsdoc
function replyWithscoresTransform(value) {
	const result_withscores = [];
	for (let index = 0; index < value.length; index += 2) {
		result_withscores.push({
			value: value[index],
			score: Number.parseFloat(value[index + 1]),
		});
	}
	return result_withscores;
}
