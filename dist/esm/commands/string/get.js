// eslint-disable-next-line jsdoc/require-jsdoc
export function input(key) {
    return {
        kind: '#schema',
        args: [
            'GET',
            key,
        ],
    };
}
