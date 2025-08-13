import { VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';

export function emittedNativeEvents<T extends Event>(
    wrapper: VueWrapper<unknown>,
    event: string | null = null,
    count: number = 1
): T[] | null {
    if (!event || !count) {
        return null;
    }

    const emitted: T[][] | undefined = wrapper.emitted(event);
    if (count === 0 && (!emitted || !emitted.length)) {
        return null;
    }

    expect(emitted).toBeTruthy();
    if (!emitted) {
        return null;
    }

    const emittedValues = emitted.flatMap((emits) => emits);
    expect(emittedValues).toBeTruthy();
    expect(emittedValues.length).toBe(count);

    return emittedValues;
}

type CustomEventValue = string | boolean | [];

export function emittedCustomEvents(
    wrapper: VueWrapper<unknown>,
    event: string | null = null,
    count: number = 1
): CustomEventValue[] | null {
    if (!event || !count) {
        return null;
    }

    const emitted: CustomEventValue[][] | undefined = wrapper.emitted(event);
    if (count === 0 && (!emitted || !emitted.length)) {
        return null;
    }

    expect(emitted).toBeTruthy();
    if (!emitted) {
        return null;
    }

    const emittedValues = emitted.flatMap((emits) => (Array.isArray(emits) && emits.length === 0 ? true : emits));
    expect(emittedValues).toBeTruthy();
    expect(emittedValues.length).toBe(count);

    return emittedValues;
}
