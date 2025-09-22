import { expect, it } from 'vitest';
import { toArray } from './arrays';

it('should transform non-array values', () => {
    expect(toArray('something')).toEqual(['something']);
    expect(toArray(42)).toEqual([42]);
    expect(toArray(true)).toEqual([true]);
});

it('should not transform array values', () => {
    expect(toArray(['something'])).toEqual(['something']);
    expect(toArray([42])).toEqual([42]);
    expect(toArray([true])).toEqual([true]);
});
