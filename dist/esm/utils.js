/**
 * Converts a string array to an object.
 * @param values A flat array containing the keys and the values.
 * @returns Object with keys and values.
 */
export function stringBulkToObject(values) {
    const object = {};
    for (let index = 0; index < values.length; index += 2) {
        object[values[index]] = values[index + 1];
    }
    return object;
}
