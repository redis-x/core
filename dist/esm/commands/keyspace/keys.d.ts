import { InputReturnType } from '../../types';
/**
 * Returns all keys matching `<pattern>`.
 * - Available since: 1.0.0.
 * - Time complexity: O(N) with N being the number of keys in the database.
 * @param pattern Pattern to match.
 * @returns -
 */
export declare function input(pattern: string): InputReturnType;
/**
 * @param result -
 * @returns A set of keys matching `<pattern>`.
 */
export declare function output(result: string[]): Set<string>;
