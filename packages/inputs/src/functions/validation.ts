import type { ValidationResult } from '../components/types';

export type ValidationFunction = (value: string) => boolean | string;

export type Validation = ValidationPreset | ValidationFunction;

export type ValidationPreset = 'required';
const ValidationPresets: Record<ValidationPreset, ValidationFunction> = {
    required: (value: string) => value && value.trim() !== ''
};

/**
 * Create validation functions from the provided validators
 *
 * @param validators one or multiple presets or functions
 * @returns an array of validation functions
 */
export function createValidators(validators: Validation | Validation[]): ValidationFunction[] {
    if (!validators || !validators.length) {
        return [];
    }

    const validatorArray = Array.isArray(validators) ? validators : [validators];

    const validatorFunctions = [];

    for (const validator of validatorArray) {
        // FIXME: Check function more specifically
        if (typeof validator === 'function') {
            validatorFunctions.push(validator);
            continue;
        }

        if (typeof validator === 'string') {
            if (!Object.keys(ValidationPresets).includes(validator)) {
                console.warn('Unknown validation preset provided');
                continue;
            }

            validatorFunctions.push(ValidationPresets[validator]);
            continue;
        }

        console.warn('Unknown validation provided');
    }

    return validatorFunctions;
}

/**
 * Validate a value using the provided functions
 *
 * @param value the value to validate
 * @param validators the array of validators to execute
 * @returns an object with the validation results
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
