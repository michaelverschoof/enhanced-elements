<template>
    <input ref="element" :class="{ focused }" type="file" @change="onChange" @focus="onFocus" @blur="onBlur" />
</template>

<script setup lang="ts">
import type { FocusableEmits, MaybeArray, ValidationResult } from '@/components/types';
import { useFocusable } from '@/composables/focus';
import { toArray } from '@/util/arrays';
import type { ValidationFunction, ValidationPresets } from '@/util/validation';
import { replaceRequiredPreset, validate } from '@/util/validation';
import { computed, InputHTMLAttributes, useTemplateRef } from 'vue';

type ValidatableProp = { validators?: MaybeArray<ValidationPresets | ValidationFunction<File[]>> };

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> & ValidatableProp;

const { validators = [] } = defineProps<Props>();

const emit = defineEmits<FocusableEmits>();

/**
 * The file input model. It is a list of files.
 *
 * As the HTML file input element does not support programmatically setting the value,
 * it does not show selected files that are set by the parent.
 */
const model = defineModel<File[]>({ default: [] });

const element = useTemplateRef<HTMLInputElement>('element');

/**
 * Composable for all inputs that have a "focused" state and corresponding emits.
 */
const { focused, onBlur, onFocus } = useFocusable(emit);

/**
 * When files are selected, get the filelist and convert it to an array for easier use.
 *
 * @param event the native change event.
 */
function onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    model.value = Array.from(input.files || []);
}

/**
 * Validator function for 'required' preset.
 */
const required: ValidationFunction<File[]> = (modelValue: File[]): boolean => !!modelValue.length;

/**
 * Reactive list of validators to execute when the model is changed.
 */
const validatorFunctions = computed<ValidationFunction<File[]>[]>(() =>
    replaceRequiredPreset(toArray(validators), required)
);

/**
 * Validate the model against the provided validators.
 */
function validateModel(): ValidationResult {
    return validate(model.value, ...validatorFunctions.value);
}

/**
 * Trigger the file select dialog.
 */
function select(): void {
    /* v8 ignore if -- @preserve */
    if (!element.value) {
        return;
    }

    element.value.click();
}

/**
 * Clear the file.
 */
function clear() {
    /* v8 ignore if -- @preserve */
    if (!element.value) {
        return;
    }

    element.value.value = '';
    model.value = [];
}

/**
 * Expose the focus and blur methods so they can be used directly via template references.
 */
defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    select,
    clear,
    validate: validateModel
});
</script>
