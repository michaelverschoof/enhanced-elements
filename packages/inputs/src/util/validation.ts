import type { ValidationResult } from '../components/types';

export type ValidationFunction = ((value: string) => boolean) | ((value: string) => boolean | string);

export type Validation = 'required' | ValidationFunction;

/**
 * Validate a value using the provided functions.
 *
 * @param value the value to validate.
 * @param validators the array of validators to execute.
 * @returns an object with the validation results.
 */
export function validate(value: string, ...validators: ValidationFunction[]): ValidationResult {
    const validationResult: ValidationResult = { valid: true, failed: [] };

    const filtered = validators.filter((validator) => !!validator);
    if (!filtered || !filtered.length) {
        return validationResult;
    }

    for (const validator of filtered) {
        const result = validator(value);
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
export function replaceRequiredPreset(validations: Validation[], required: ValidationFunction): ValidationFunction[] {
    if (!validations.length) {
        return [];
    }

    const index = validations.findIndex((validator) => validator === 'required');
    if (index !== -1) {
        validations.splice(index, 1, required);
    }

    return validations as ValidationFunction[];
}
