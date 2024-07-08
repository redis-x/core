/* eslint-disable eqeqeq, no-eq-null, unicorn/filename-case */

/**
 * lodash <https://lodash.com/>
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

import { isObjectLike } from './isObjectLike.js';

/** `Object#toString` result references. */
const objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
	// Many host objects are `Object` objects that can coerce to strings
	// despite having improperly defined `toString` methods.
	let result = false;
	if (value != null && typeof value.toString !== 'function') {
		try {
			result = Boolean(String(value));
		}
		catch {}
	}
	return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} function_ The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArgument(function_, transform) {
	return function (arg) {
		return function_(transform(arg));
	};
}

/** Used for built-in method references. */
const functionProto = Function.prototype;
const objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
const functionToString = functionProto.toString;

/** Used to check objects for own properties. */
const { hasOwnProperty } = objectProto;

/** Used to infer the `Object` constructor. */
const objectCtorString = functionToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
const objectToString = objectProto.toString;

/** Built-in value references. */
const getPrototype = overArgument(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
export function isPlainObject(value) {
	if (
		!isObjectLike(value)
		|| objectToString.call(value) != objectTag
		|| isHostObject(value)
	) {
		return false;
	}

	const proto = getPrototype(value);
	if (proto === null) {
		return true;
	}

	const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	return (
		typeof Ctor === 'function'
		&& Ctor instanceof Ctor
		&& functionToString.call(Ctor) == objectCtorString
	);
}
