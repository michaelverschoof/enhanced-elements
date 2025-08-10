import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { ValidationFunction } from './validation';
import { createValidators, validate } from './validation';

const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => vi.fn());

const booleanValidation: ValidationFunction = (value: string) => value.length < 5;
const stringValidation: ValidationFunction = (value: string) => (value.length < 5 ? true : 'Value is too long');

const validResponse = { valid: true, failed: [] };
const invalidResponse = { valid: false, failed: [] };
const invalidResponseWithMessage = { valid: false, failed: ['Value is too long'] };

afterEach(() => {
    vi.clearAllMocks();
});

describe('Creating validators', () => {
    it('should return functions from filter presets', async () => {
        areFunctions(createValidators('required'));
        areFunctions(createValidators(['required']));
    });

    it('should return functions from functions', async () => {
        areFunctions(createValidators(booleanValidation));
        areFunctions(createValidators(stringValidation));
        areFunctions(createValidators([booleanValidation, stringValidation]));
    });

    it('should return an empty array on incorrect values', async () => {
        expect(createValidators([])).toEqual([]);
        // @ts-expect-error Type is not allowed as a parameter
        expect(createValidators(null)).toEqual([]);

        // @ts-expect-error Type is not allowed as a parameter        expect(createFilters([])).toEqual([]);
        expect(createValidators('wrong preset')).toEqual([]);
        expect(warnSpy).toHaveBeenCalledOnce();
        expect(warnSpy).toHaveBeenCalledWith('Unknown validation preset provided');

        // @ts-expect-error Type is not allowed as a parameter
        expect(createValidators(42)).toEqual([]);
        expect(warnSpy).toHaveBeenCalledTimes(2);
        expect(warnSpy).toHaveBeenCalledWith('Unknown validation provided');

        // @ts-expect-error Type is not allowed as a parameter
        expect(createValidators([42, null, undefined])).toEqual([]);
        expect(warnSpy).toHaveBeenCalledTimes(5);
        expect(warnSpy).toHaveBeenCalledWith('Unknown validation provided');
    });

    it('should return a filtered array on partially incorrect values', async () => {
        // @ts-expect-error Type is not allowed as a parameter
        expect(createValidators(['required', 42]).length).toEqual(1);
        // @ts-expect-error Type is not allowed as a parameter
        expect(createValidators(['required', null, undefined]).length).toEqual(1);
    });
});

describe('Validating values', () => {
    it('should validate value with a single function', () => {
        // Valid values
        expect(validate('abc', booleanValidation)).toEqual(validResponse);
        expect(validate('abc', stringValidation)).toEqual(validResponse);

        // Invalid values
        expect(validate('abcdef', booleanValidation)).toEqual(invalidResponse);
        expect(validate('abcdef', stringValidation)).toEqual(invalidResponseWithMessage);
    });

    it('should validate value with a multiple functions', () => {
        // Valid values
        expect(validate('abc', booleanValidation, stringValidation)).toEqual(validResponse);

        // Invalid values
        expect(validate('abcdef', booleanValidation, stringValidation)).toEqual(invalidResponseWithMessage);
    });

    it('should validate value with a preset', () => {
        // Valid values
        expect(validate('abc', ...createValidators('required'))).toEqual(validResponse);
    });

    it('should filter out non-usable validators', () => {
        // @ts-expect-error null and undefined are not allowed
        expect(validate('abc', null, undefined, '')).toEqual(validResponse);
    });
});

function areFunctions(functions: ValidationFunction[]) {
    for (const f of functions) {
        expectTypeOf(f).toBeFunction();
    }
}
