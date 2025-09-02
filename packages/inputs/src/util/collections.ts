export type StringCollection = Set<string> | string[];

/**
 * Add a value to the Array or Set without creating duplicate entries.
 *
 * @param value The value to add.
 * @param collection The Array or Set to add the value to.
 */
export function add(value: string, collection: StringCollection): StringCollection {
    if (Array.isArray(collection)) {
        if (value && !collection.includes(value)) {
            collection.push(value);
        }
        return collection;
    }

    if (value) {
        collection.add(value);
    }

    return collection;
}

/**
 * Remove a value from the Array or Set without creating duplicate entries.
 *
 * @param value The value to add.
 * @param collection The Array or Set to add the value to.
 */
export function remove(value: string, collection: StringCollection): StringCollection {
    if (Array.isArray(collection)) {
        const index = collection.indexOf(value);
        if (index !== -1) {
            collection.splice(index, 1);
        }
        return collection;
    }

    if (value) {
        collection.delete(value);
    }

    return collection;
}

/**
 * Determine if a value exists in an Array or Set.
 *
 * @param value The value to find.
 * @param collection The Array or Set to find the value in.
 */
export function has(value: string, collection: StringCollection): boolean {
    if (Array.isArray(collection)) {
        return collection.includes(value);
    }

    return collection.has(value);
}
