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
    return [[
            'HDEL',
            key,
            ...fields_array,
        ]];
}
