import { afterEach, describe, expect, it, vi } from 'vitest';
import { validate, type ValidationFunction } from './validation';

const booleanValidation: ValidationFunction = (value: string) => value.length < 5;
const stringValidation: ValidationFunction = (value: string) => (value.length < 5 ? true : 'Value is too long');

const validResponse = { valid: true, failed: [] };
const invalidResponse = { valid: false, failed: [] };
const invalidResponseWithMessage = { valid: false, failed: ['Value is too long'] };

afterEach(() => {
    vi.clearAllMocks();
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

    it('should filter out non-usable validators', () => {
        // @ts-expect-error null and undefined are not allowed
        expect(validate('abc', null, undefined, '')).toEqual(validResponse);
    });
});
