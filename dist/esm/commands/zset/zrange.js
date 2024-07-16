/* eslint-disable jsdoc/require-jsdoc */
export function input(key, start, stop, options) {
    const command_arguments = [
        'ZRANGE',
        key,
        String(start),
        String(stop),
    ];
    let modifier;
    if (options) {
        if (options.REV) {
            command_arguments.push('REV');
        }
        if (options.LIMIT) {
            command_arguments.push('LIMIT', String(options.LIMIT[0]), String(options.LIMIT[1]));
        }
        if (options.BYSCORE) {
            command_arguments.push('BYSCORE');
        }
        else if (options.BYLEX) {
            command_arguments.push('BYLEX');
        }
        if (options.WITHSCORES) {
            command_arguments.push('WITHSCORES');
            modifier = 'WITHSCORES';
        }
    }
    return [
        command_arguments,
        modifier,
    ];
}
export function output(result, modifier) {
    if (modifier === 'WITHSCORES') {
        const map = new Map();
        for (let index = 0; index < result.length; index += 2) {
            map.set(result[index], Number.parseFloat(result[index + 1]));
        }
        return map;
    }
    return result;
}
