import type { Filter, Modifier } from '@/util/model';

/**
 * Properties for the text-input and text-area inputs
 */
export type TransformableInputProps = {
    filters?: Filter | Filter[];
    modifiers?: Modifier | Modifier[];
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

/**
 * A single or array of the provided type
 */
export type MaybeArray<T> = T | T[];
