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
