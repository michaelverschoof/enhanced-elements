<template>
    <input
        ref="element"
        v-model="model"
        :value="value"
        :class="{ focused }"
        type="checkbox"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>

<script lang="ts" setup>
import { useFocusable } from '@/composables/focus';
import { toArray } from '@/util/arrays';
import type { StringCollection } from '@/util/collections';
import { add as addToCollection, has, remove as removeFromCollection } from '@/util/collections';
import { replaceRequiredPreset, validate, Validation, ValidationFunction } from '@/util/validation';
import { computed, InputHTMLAttributes, ref } from 'vue';
import type { FocusableEmits, ValidatableInputProps, ValidationResult } from './types';

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> & ValidatableInputProps & { value?: string };

const { value, validators = [] } = defineProps<Props>();

const emit = defineEmits<FocusableEmits>();

const model = defineModel<Set<string> | string[] | boolean>();

const element = ref<HTMLInputElement>();

/**
 * Composable for all inputs that have a "focused" state and corresponding emits.
 */
const { focused, onBlur, onFocus } = useFocusable(emit);

/**
 * Validator function for 'required' preset.
 */
const required: ValidationFunction = (value: string): boolean => {
    if (model.value === undefined || typeof model.value === 'boolean') {
        return !!model.value;
    }

    if (!value) {
        console.warn('Could validate checkbox-item.', 'There is no value to validate.');
        return false;
    }

    return has(value, model.value);
};

/**
 * Reactive list of validators to execute when the model is changed.
 */
const validatorFunctions = computed<ValidationFunction[]>(() =>
    replaceRequiredPreset(toArray<Validation>(validators), required)
);

/**
 * Validate the model against the provided validators.
 */
function validateModel(): ValidationResult {
    // TODO: Do we really send the value here instead of the model value?
    // Will this work for other validations?
    return validate(value, ...validatorFunctions.value);
}

/**
 * Set the model value according to the model type to check the checkbox
 */
function check(): void {
    if (typeof model.value === 'boolean') {
        model.value = true;
        return;
    }

    if (!value) {
        console.warn('Could not tick checkbox-item.', 'There is no value to set.');
        return;
    }

    model.value = addToCollection(value as string, model.value as StringCollection);
}

/**
 * Unset the model value according to the model type to uncheck the checkbox
 */
function uncheck(): void {
    if (typeof model.value === 'boolean') {
        model.value = false;
        return;
    }

    if (!value) {
        console.warn('Could not untick checkbox-item.', 'There is no value to unset.');
        return;
    }

    model.value = removeFromCollection(value as string, model.value as StringCollection);
}

/**
 * Expose the focus, blur, check and uncheck methods so they can be used directly via template references.
 */
defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    check,
    uncheck,
    validate: validateModel
});
</script>
