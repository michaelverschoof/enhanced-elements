import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { TransformFunction } from './model';
import { createFilters, createModifiers, transform } from './model';

const letterFilter = (value: string) => (value.match(/[A-Za-z]/g) || []).join('');
const numberFilter = (value: string) => (value.match(/[0-9]/g) || []).join('');
const uppercaseModifier = (value: string) => value.toUpperCase();
const lowercaseModifier = (value: string) => value.toLowerCase();

const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => vi.fn());

afterEach(() => {
    vi.clearAllMocks();
});

describe('Creating filters', () => {
    it('should return functions from filter presets', async () => {
        areFunctions(createFilters('letters'));
        areFunctions(createFilters('numbers'));
        areFunctions(createFilters(['letters', 'numbers']));
    });

    it('should return functions from regexes', async () => {
        const letterRegex = /[A-Za-z]/g;
        const numberRegex = new RegExp('[0-9]', 'g');

        areFunctions(createFilters(letterRegex));
        areFunctions(createFilters(numberRegex));
        areFunctions(createFilters([letterRegex, numberRegex]));
    });

    it('should return functions from functions', async () => {
        const firstChar = (value: string) => value.charAt(0);
        const lastChar = (value: string) => value.charAt(value.length - 1);

        areFunctions(createFilters(firstChar));
        areFunctions(createFilters(lastChar));
        areFunctions(createFilters([firstChar, lastChar]));
    });

    it('should return an empty array on incorrect values', async () => {
        expect(createFilters([])).toEqual([]);
        // @ts-expect-error Type is not allowed as a parameter
        expect(createFilters(null)).toEqual([]);

        // @ts-expect-error Type is not allowed as a parameter        expect(createFilters([])).toEqual([]);
        expect(createFilters('wrong preset')).toEqual([]);
        expect(warnSpy).toHaveBeenCalledOnce();
        expect(warnSpy).toHaveBeenCalledWith('Unknown filter preset provided');

        // @ts-expect-error Type is not allowed as a parameter
        expect(createFilters(42)).toEqual([]);
        expect(warnSpy).toHaveBeenCalledTimes(2);
        expect(warnSpy).toHaveBeenCalledWith('Unknown filter provided');

        // @ts-expect-error Type is not allowed as a parameter
        expect(createFilters([42, null, undefined])).toEqual([]);
        expect(warnSpy).toHaveBeenCalledTimes(5);
        expect(warnSpy).toHaveBeenCalledWith('Unknown filter provided');
    });

    it('should return a filtered array on partially incorrect values', async () => {
        // @ts-expect-error Type is not allowed as a parameter
        expect(createFilters(['letters', 42]).length).toEqual(1);
        // @ts-expect-error Type is not allowed as a parameter
        expect(createFilters(['numbers', null, undefined]).length).toEqual(1);
    });
});

describe('Creating modifiers', () => {
    it('should return functions from modifier presets', async () => {
        areFunctions(createModifiers('lowercase'));
        areFunctions(createModifiers('uppercase'));
        areFunctions(createModifiers(['lowercase', 'uppercase']));
    });

    it('should return functions from functions', async () => {
        const firstChar = (value: string) => value.charAt(0);
        const lastChar = (value: string) => value.charAt(value.length - 1);

        areFunctions(createModifiers(firstChar));
        areFunctions(createModifiers(lastChar));
        areFunctions(createModifiers([firstChar, lastChar]));
    });

    it('should return an empty array on incorrect values', async () => {
        // @ts-expect-error Type is not allowed as a parameter
        expect(createModifiers(null)).toEqual([]);
        expect(createModifiers([])).toEqual([]);
        // @ts-expect-error Type is not allowed as a parameter
        expect(createModifiers('wrong preset')).toEqual([]);
        expect(warnSpy).toHaveBeenCalledOnce();
        expect(warnSpy).toHaveBeenCalledWith('Unknown modifier preset provided');
        // @ts-expect-error Type is not allowed as a parameter
        expect(createModifiers(42)).toEqual([]);
        // @ts-expect-error Type is not allowed as a parameter
        expect(createModifiers([42, null, undefined])).toEqual([]);
        expect(warnSpy).toHaveBeenCalledTimes(4);
        expect(warnSpy).toHaveBeenCalledWith('Unknown modifier provided');
    });

    it('should return a filtered array on partially incorrect values', async () => {
        // @ts-expect-error Type is not allowed as a parameter
        expect(createModifiers(['lowercase', 42]).length).toEqual(1);
        // @ts-expect-error Type is not allowed as a parameter
        expect(createModifiers(['uppercase', null, undefined]).length).toEqual(1);
    });
});

describe('Transforming values', () => {
    it('should transform value with a single function', async () => {
        const testValue = 'AbC123dEf';

        expect(transform(testValue, letterFilter)).toEqual('AbCdEf');
        expect(transform(testValue, numberFilter)).toEqual('123');
        expect(transform(testValue, uppercaseModifier)).toEqual('ABC123DEF');
        expect(transform(testValue, lowercaseModifier)).toEqual('abc123def');
    });

    it('should transform value with a multiple functions', async () => {
        const testValue = 'AbC123dEf';

        expect(transform(testValue, letterFilter, uppercaseModifier)).toEqual('ABCDEF');
        expect(transform(testValue, letterFilter, uppercaseModifier, lowercaseModifier)).toEqual('abcdef');
    });

    it('should return an empty string if there is no value', async () => {
        expect(transform('', letterFilter)).toEqual('');
        // @ts-expect-error Type is not allowed as a parameter
        expect(transform(null, letterFilter)).toEqual('');
        expect(transform(undefined, letterFilter)).toEqual('');
    });

    it('should return the value if there are no functions', async () => {
        expect(transform('test')).toEqual('test');
        // @ts-expect-error Type is not allowed as a parameter
        expect(transform('test', null)).toEqual('test');
        // @ts-expect-error Type is not allowed as a parameter
        expect(transform('test', null, null)).toEqual('test');
        // @ts-expect-error Type is not allowed as a parameter
        expect(transform('test', undefined, undefined)).toEqual('test');
    });
});

function areFunctions(functions: TransformFunction[]) {
    for (const f of functions) {
        expectTypeOf(f).toBeFunction();
    }
}
