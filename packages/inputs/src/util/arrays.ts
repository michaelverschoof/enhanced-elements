/**
 * Convert a value to an array, unless it's already an array.
 *
 * @param value the value to convert.
 * @returns an array of the provided value type.
 */
export function toArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
}
