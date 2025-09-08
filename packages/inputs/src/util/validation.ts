import type { CheckableModel, ValidationResult } from '@/components/types';

export type BaseValidationFunction = ((modelValue: string) => boolean) | ((modelValue: string) => boolean | string);

export type CheckableValidationFunction = (modelValue: CheckableModel, value: string) => boolean | string;

export type ValidationFunction = BaseValidationFunction | CheckableValidationFunction;

export type Validation = 'required' | ValidationFunction;

/**
 * Validate a value using the provided functions.
 *
 * TODO: Create a generic function for validation
 *
 * @param modelValue the value to validate.
 * @param validators the array of validators to execute.
 * @returns an object with the validation results.
 */
export function validate(modelValue: string, ...validators: BaseValidationFunction[]): ValidationResult {
    const validationResult: ValidationResult = { valid: true, failed: [] };

    const filtered = validators.filter((validator) => !!validator);
    if (!filtered || !filtered.length) {
        return validationResult;
    }

    for (const validator of filtered) {
        const result = validator(modelValue);
        if (result === true) {
            continue;
        }

        validationResult.valid = false;
        if (typeof result !== 'string') {
            continue;
        }

        validationResult.failed.push(result);
    }

    return validationResult;
}

export function validateCheckable(
    modelValue: CheckableModel,
    value: string,
    validators: CheckableValidationFunction[]
): ValidationResult {
    const validationResult: ValidationResult = { valid: true, failed: [] };

    const filtered = validators.filter((validator) => !!validator);
    if (!filtered.length) {
        return validationResult;
    }

    for (const validator of filtered) {
        const result = validator(modelValue, value);
        if (result === true) {
            continue;
        }

        validationResult.valid = false;
        if (typeof result !== 'string') {
            continue;
        }

        validationResult.failed.push(result);
    }

    return validationResult;
}

/**
 * Replace the 'required' preset with the provided validator function.
 *
 * @param validations the array of validations.
 * @param required the function to inject.
 * @returns the updated array.
 */
export function replaceRequiredPreset<T extends ValidationFunction>(validations: Validation[], required: T): T[] {
    if (!validations.length) {
        return [];
    }

    const index = validations.findIndex((validator) => validator === 'required');
    if (index !== -1) {
        validations.splice(index, 1, required);
    }

    return validations as T[];
}
