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
        if (options.BYSCORE) {
            command_arguments.push('BYSCORE');
        }
        if (options.BYLEX) {
            command_arguments.push('BYLEX');
        }
        if (options.LIMIT) {
            command_arguments.push('LIMIT', String(options.LIMIT[0]), String(options.LIMIT[1]));
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
        const result_withscores = [];
        for (let index = 0; index < result.length; index += 2) {
            result_withscores.push({
                value: result[index],
                score: Number.parseFloat(result[index + 1]),
            });
        }
        return result_withscores;
    }
    return result;
}
