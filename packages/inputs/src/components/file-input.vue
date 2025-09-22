<template>
    <input ref="element" :class="{ focused }" type="file" @change="onChange" @focus="onFocus" @blur="onBlur" />
</template>

<script setup lang="ts">
import type { FocusableEmits, ValidatableInputProps, ValidationResult } from '@/components/types';
import { useFocusable } from '@/composables/focus';
import { toArray } from '@/util/arrays';
import { FileValidationFunction, replaceRequiredPreset, validateFile, Validation } from '@/util/validation';
import { computed, InputHTMLAttributes, ref, useTemplateRef } from 'vue';

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> & ValidatableInputProps;

const { validators = [] } = defineProps<Props>();

const emit = defineEmits<{ 'update:modelValue': [files: File[]] } & FocusableEmits>();

/**
 * The file input model. It is a list of files.
 */
const model = ref<File[]>([]);

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

    emit('update:modelValue', model.value);
}

/**
 * Validator function for 'required' preset.
 */
const required: FileValidationFunction = (modelValue: File[]): boolean => {
    return !!modelValue.length;
};

/**
 * Reactive list of validators to execute when the model is changed.
 */
const validatorFunctions = computed<FileValidationFunction[]>(() =>
    replaceRequiredPreset<FileValidationFunction>(toArray<Validation>(validators), required)
);

/**
 * Validate the model against the provided validators.
 */
function validateModel(): ValidationResult {
    return validateFile(model.value, ...validatorFunctions.value);
}

/**
 * Trigger the file select dialog.
 */
function select(): void {
    /* v8 ignore next 3 */
    if (!element.value) {
        return;
    }

    element.value.click();
}

/**
 * Clear the file.
 */
function clear() {
    /* v8 ignore next 3 */
    if (!element.value) {
        return;
    }

    element.value.value = '';
    model.value = [];
    emit('update:modelValue', model.value);
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
