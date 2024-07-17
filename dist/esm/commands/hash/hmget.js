/* eslint-disable jsdoc/require-jsdoc */
export function input(key, arg1, ...args) {
    let fields_array = [];
    if (typeof arg1 === 'string') {
        fields_array = args;
        fields_array.unshift(arg1);
    }
    else if (Array.isArray(arg1)) {
        fields_array = arg1;
    }
    else {
        fields_array = [...arg1];
    }
    return [
        [
            'HMGET',
            key,
            ...fields_array,
        ],
        JSON.stringify(fields_array),
    ];
}
/**
 * @param result -
 * @param modificator -
 * @returns The value associated with the field or `null` when the field is not present in the hash or key does not exist.
 */
export function output(result, modificator) {
    const fields = JSON.parse(modificator);
    const output = {};
    for (const [index, field] of fields.entries()) {
        const value = result[index];
        if (value !== undefined) {
            output[field] = value;
        }
    }
    return output;
}
