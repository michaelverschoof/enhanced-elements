import { describe, expect, it } from 'vitest';
import { add, has, remove } from './collections';

describe('Adding to collections', () => {
    describe('Arrays', () => {
        it('should add values', async () => {
            expect(add('foo', [])).toEqual(['foo']);
            expect(add('bar', ['foo'])).toEqual(['foo', 'bar']);
            expect(add('baz', ['foo', 'bar'])).toEqual(['foo', 'bar', 'baz']);
        });

        it('should not add existing values', async () => {
            expect(add('foo', ['foo'])).toEqual(['foo']);
            expect(add('bar', ['foo', 'bar'])).toEqual(['foo', 'bar']);
            expect(add('baz', ['foo', 'bar', 'baz'])).toEqual(['foo', 'bar', 'baz']);
        });

        it('should not add incorrect values', async () => {
            expect(add('', ['foo'])).toEqual(['foo']);
            // @ts-expect-error Value is not allowed
            expect(add(null, ['foo'])).toEqual(['foo']);
            // @ts-expect-error Value is not allowed
            expect(add(undefined, ['foo'])).toEqual(['foo']);
        });
    });

    describe('Sets', () => {
        it('should add values', async () => {
            expect(add('foo', new Set())).toEqual(new Set(['foo']));
            expect(add('bar', new Set(['foo']))).toEqual(new Set(['foo', 'bar']));
            expect(add('baz', new Set(['foo', 'bar']))).toEqual(new Set(['foo', 'bar', 'baz']));
        });

        it('should not add existing values', async () => {
            expect(add('foo', new Set(['foo']))).toEqual(new Set(['foo']));
            expect(add('bar', new Set(['foo', 'bar']))).toEqual(new Set(['foo', 'bar']));
            expect(add('baz', new Set(['foo', 'bar', 'baz']))).toEqual(new Set(['foo', 'bar', 'baz']));
        });

        it('should not add incorrect values', async () => {
            expect(add('', new Set(['foo']))).toEqual(new Set(['foo']));
            // @ts-expect-error Value is not allowed
            expect(add(null, new Set(['foo']))).toEqual(new Set(['foo']));
            // @ts-expect-error Value is not allowed
            expect(add(undefined, new Set(['foo']))).toEqual(new Set(['foo']));
        });
    });
});

describe('Removing from collections', () => {
    describe('Arrays', () => {
        it('should remove values', async () => {
            expect(remove('foo', ['foo'])).toEqual([]);
            expect(remove('bar', ['foo', 'bar'])).toEqual(['foo']);
            expect(remove('baz', ['foo', 'bar', 'baz'])).toEqual(['foo', 'bar']);
        });

        it('should not remove non-existing values', async () => {
            expect(remove('bar', ['foo'])).toEqual(['foo']);
            expect(remove('baz', ['foo', 'bar'])).toEqual(['foo', 'bar']);
        });

        it('should not remove incorrect values', async () => {
            expect(remove('', ['foo'])).toEqual(['foo']);
            // @ts-expect-error Value is not allowed
            expect(remove(null, ['foo'])).toEqual(['foo']);
            // @ts-expect-error Value is not allowed
            expect(remove(undefined, ['foo'])).toEqual(['foo']);
        });
    });

    describe('Sets', () => {
        it('should remove values', async () => {
            expect(remove('foo', new Set(['foo']))).toEqual(new Set());
            expect(remove('bar', new Set(['foo', 'bar']))).toEqual(new Set(['foo']));
            expect(remove('baz', new Set(['foo', 'bar', 'baz']))).toEqual(new Set(['foo', 'bar']));
        });

        it('should not remove non-existing values', async () => {
            expect(remove('bar', new Set(['foo']))).toEqual(new Set(['foo']));
            expect(remove('baz', new Set(['foo', 'bar']))).toEqual(new Set(['foo', 'bar']));
        });

        it('should not remove incorrect values', async () => {
            expect(remove('', new Set(['foo']))).toEqual(new Set(['foo']));
            // @ts-expect-error Value is not allowed
            expect(remove(null, new Set(['foo']))).toEqual(new Set(['foo']));
            // @ts-expect-error Value is not allowed
            expect(remove(undefined, new Set(['foo']))).toEqual(new Set(['foo']));
        });
    });
});

describe('Checking if collections contain values', () => {
    describe('Arrays', () => {
        it('should find values', async () => {
            expect(has('foo', ['foo'])).toBe(true);
            expect(has('bar', ['foo', 'bar'])).toBe(true);
            expect(has('baz', ['foo', 'bar', 'baz'])).toBe(true);
        });

        it('should not find non-existing values', async () => {
            expect(has('bar', ['foo'])).toBe(false);
            expect(has('baz', ['foo', 'bar'])).toBe(false);
        });
    });

    describe('Sets', () => {
        it('should remove values', async () => {
            expect(has('foo', new Set(['foo']))).toBe(true);
            expect(has('bar', new Set(['foo', 'bar']))).toBe(true);
            expect(has('baz', new Set(['foo', 'bar', 'baz']))).toBe(true);
        });

        it('should not remove non-existing values', async () => {
            expect(has('bar', new Set(['foo']))).toBe(false);
            expect(has('baz', new Set(['foo', 'bar']))).toBe(false);
        });
    });
});
