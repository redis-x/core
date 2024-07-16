/* eslint-disable jsdoc/require-jsdoc */

export function createRandomKey() {
	return 'key:' + Math.random().toString(36).slice(2, 12);
}
