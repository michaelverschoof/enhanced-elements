import type { Filters, Modifiers } from '../functions/model';
import type { Validation } from '../functions/validation';

/**
 * Properties for the textual-input and textual-area inputs
 */
export type TransformableInputProps = {
    filters?: Filters | Filters[];
    modifiers?: Modifiers | Modifiers[];
};

/**
 * Properties for validatable components
 */
export type ValidatableInputProps = {
    validators?: Validation | Validation[];
};

/**
 * Focus emits
 */
export type FocusableEmits = {
    focus: [event: FocusEvent];
    blur: [event: FocusEvent];
};

/**
 * Emits for validatable components
 */
export type ValidationResult = {
    valid: boolean;
    failed: string[];
};

export type ValidatableEmits = {
    validated: [result: ValidationResult];
};
