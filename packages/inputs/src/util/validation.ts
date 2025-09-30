import type { ValidationResult } from '@/components/types';

/* Generic validate function. */
export type ValidationFunction<ModelValue = string> = (modelValue: ModelValue, ...args: unknown[]) => boolean | string;

/* Validation presets. */
export type ValidationPresets = 'required';

/**
 * Validate a value using the provided functions.
 *
 * @param modelValue the value to validate.
 * @param validators the array of validators to execute.
 * @returns an object with the validation results.
 */
export function validate<ModelValue>(
    modelValue: ModelValue,
    ...validators: ValidationFunction<ModelValue>[]
): ValidationResult {
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

/**
 * Replace the 'required' preset with the provided validator function.
 *
 * @param validations the array of validations.
 * @param required the function to inject.
 * @returns the updated array.
 */
export function replaceRequiredPreset<ValidationFunction>(
    validations: ('required' | ValidationFunction)[],
    required: ValidationFunction
): ValidationFunction[] {
    if (!validations?.length) {
        return [];
    }

    const index = validations.findIndex((validator) => validator === 'required');
    if (index === -1) {
        return validations as ValidationFunction[];
    }

    if (!required) {
        validations.splice(index, 1);
        return validations as ValidationFunction[];
    }

    validations.splice(index, 1, required);
    return validations as ValidationFunction[];
}
