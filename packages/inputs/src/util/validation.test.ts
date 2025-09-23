import { CheckboxModel } from '@/components/types';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { has } from './collections';
import { replaceRequiredPreset, validate, validateCheckbox, validateFile, validateRadio } from './validation';

const validResponse = { valid: true, failed: [] };
const invalidResponse = { valid: false, failed: [] };

afterEach(() => {
    vi.clearAllMocks();
});

describe('Validating string values', () => {
    const booleanValidation = (value: string) => value.length < 5;
    const stringValidation = (value: string) => (value.length < 5 ? true : 'Value is too long');

    const invalidResponseWithMessage = { valid: false, failed: ['Value is too long'] };

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
        // @ts-expect-error the provided  validators are not allowed types, which we're testing.
        expect(validate('abc', null, undefined, '')).toEqual(validResponse);
    });
});

describe('Validating radio values', () => {
    const requiredValidation = (modelValue: string | unknown) => modelValue !== null && modelValue !== undefined;
    const specificValueValidation = (modelValue: string | unknown) => (modelValue === 'abc' ? true : 'Wrong value');

    const invalidResponseWithMessage = { valid: false, failed: ['Wrong value'] };

    it('should validate value with a single function', () => {
        // Valid values
        expect(validateRadio('abc', requiredValidation)).toEqual(validResponse);
        expect(validateRadio('abc', specificValueValidation)).toEqual(validResponse);

        // Invalid values
        expect(validateRadio(null, requiredValidation)).toEqual(invalidResponse);
        expect(validateRadio('abcdef', specificValueValidation)).toEqual(invalidResponseWithMessage);
    });

    it('should validate value with a multiple functions', () => {
        // Valid values
        expect(validateRadio('abc', requiredValidation, specificValueValidation)).toEqual(validResponse);

        // Invalid values
        expect(validateRadio('abcdef', requiredValidation, specificValueValidation)).toEqual(
            invalidResponseWithMessage
        );
    });

    it('should filter out non-usable validators', () => {
        // @ts-expect-error the provided  validators are not allowed types, which we're testing.
        expect(validateRadio('abc', null, undefined, '')).toEqual(validResponse);
    });
});

describe('Validating file values', () => {
    const requiredValidation = (modelValue: File[]) => !!modelValue.length;
    const specificValueValidation = (modelValue: File[]) =>
        modelValue[0].name === 'test-file.txt' ? true : 'Wrong file';

    const invalidResponseWithMessage = { valid: false, failed: ['Wrong file'] };

    const fileMock = new File(['(file content)'], 'test-file.txt', {
        type: 'text/plain'
    });

    it('should validate value with a single function', () => {
        // Valid values
        expect(validateFile([fileMock], requiredValidation)).toEqual(validResponse);
        expect(validateFile([fileMock], specificValueValidation)).toEqual(validResponse);

        // Invalid values
        expect(validateFile([], requiredValidation)).toEqual(invalidResponse);
        expect(validateFile([{ ...fileMock, name: 'invalid-file.txt' }], specificValueValidation)).toEqual(
            invalidResponseWithMessage
        );
    });

    it('should validate value with a multiple functions', () => {
        // Valid values
        expect(validateFile([fileMock], requiredValidation, specificValueValidation)).toEqual(validResponse);

        // Invalid values
        expect(
            validateFile([{ ...fileMock, name: 'invalid-file.txt' }], requiredValidation, specificValueValidation)
        ).toEqual(invalidResponseWithMessage);
    });

    it('should filter out non-usable validators', () => {
        // @ts-expect-error the provided  validators are not allowed types, which we're testing.
        expect(validateFile([fileMock], null, undefined, '')).toEqual(validResponse);
    });
});

describe('Validating checkbox values', () => {
    const requiredValidation = (modelValue: CheckboxModel, value: string) => {
        if (modelValue === undefined || typeof modelValue === 'boolean') {
            return !!modelValue;
        }

        return value ? has(value, modelValue) : false;
    };

    const specificValueValidation = (modelValue: CheckboxModel, value: string) => {
        if (modelValue === undefined || typeof modelValue === 'boolean') {
            return !!modelValue ? true : 'Wrong value';
        }

        return value === 'test' ? true : 'Wrong value';
    };

    const invalidResponseWithMessage = { valid: false, failed: ['Wrong value'] };

    it('should validate value with a single function', () => {
        // Valid values
        expect(validateCheckbox(true, '', requiredValidation)).toEqual(validResponse);
        expect(validateCheckbox(true, '', specificValueValidation)).toEqual(validResponse);
        expect(validateCheckbox(['test'], 'test', requiredValidation)).toEqual(validResponse);
        expect(validateCheckbox(['test'], 'test', specificValueValidation)).toEqual(validResponse);
        expect(validateCheckbox(new Set(['test']), 'test', requiredValidation)).toEqual(validResponse);
        expect(validateCheckbox(new Set(['test']), 'test', specificValueValidation)).toEqual(validResponse);

        // Invalid values
        expect(validateCheckbox(false, '', requiredValidation)).toEqual(invalidResponse);
        expect(validateCheckbox(false, '', specificValueValidation)).toEqual(invalidResponseWithMessage);
        expect(validateCheckbox(['test'], 'invalid', requiredValidation)).toEqual(invalidResponse);
        expect(validateCheckbox(['test'], 'invalid', specificValueValidation)).toEqual(invalidResponseWithMessage);
        expect(validateCheckbox(new Set(['test']), 'invalid', requiredValidation)).toEqual(invalidResponse);
        expect(validateCheckbox(new Set(['test']), 'invalid', specificValueValidation)).toEqual(
            invalidResponseWithMessage
        );
    });

    it('should validate value with a multiple functions', () => {
        // Valid values
        expect(validateCheckbox(true, '', requiredValidation, specificValueValidation)).toEqual(validResponse);
        expect(validateCheckbox(['test'], 'test', requiredValidation, specificValueValidation)).toEqual(validResponse);
        expect(validateCheckbox(new Set(['test']), 'test', requiredValidation, specificValueValidation)).toEqual(
            validResponse
        );

        // Invalid values
        expect(validateCheckbox(false, '', requiredValidation, specificValueValidation)).toEqual(
            invalidResponseWithMessage
        );
        expect(validateCheckbox(['test'], 'invalid', requiredValidation, specificValueValidation)).toEqual(
            invalidResponseWithMessage
        );
        expect(validateCheckbox(new Set(['test']), 'invalid', requiredValidation, specificValueValidation)).toEqual(
            invalidResponseWithMessage
        );
    });

    it('should filter out non-usable validators', () => {
        // @ts-expect-error the provided  validators are not allowed types, which we're testing.
        expect(validateCheckbox('abc', null, undefined, '')).toEqual(validResponse);
    });
});

describe('Replacing presets', () => {
    const validation = () => true;

    it('should replace a preset with a function', () => {
        expect(replaceRequiredPreset(['required'], validation)).toEqual([validation]);
        expect(replaceRequiredPreset([validation, 'required'], validation)).toEqual([validation, validation]);
    });

    it('should not replace anything if there is no preset', () => {
        expect(replaceRequiredPreset([validation], validation)).toEqual([validation]);
        expect(replaceRequiredPreset([validation, validation], validation)).toEqual([validation, validation]);
    });

    it('should filter out the preset if there is no replacement function', () => {
        // @ts-expect-error null is not allowed, but we're testing explicitly
        expect(replaceRequiredPreset(['required'], null)).toEqual([]);
        // @ts-expect-error undefined is not allowed, but we're testing explicitly
        expect(replaceRequiredPreset([validation, 'required'], undefined)).toEqual([validation]);
    });

    it('should return an empty array of there are no validators', () => {
        expect(replaceRequiredPreset([], validation)).toEqual([]);
        // @ts-expect-error null is not allowed, but we're testing explicitly
        expect(replaceRequiredPreset(null, validation)).toEqual([]);
        // @ts-expect-error undefined is not allowed, but we're testing explicitly
        expect(replaceRequiredPreset(undefined, validation)).toEqual([]);
    });
});
