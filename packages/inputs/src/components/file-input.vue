<template>
    <input ref="element" :class="{ focused }" type="file" @change="onChange" @focus="onFocus" @blur="onBlur" />
</template>

<script setup lang="ts">
import type { FocusableEmits, ValidatableEmits } from '@/components/types';
import { useFocusable } from '@/composables/focus';
import { InputHTMLAttributes, ref, useTemplateRef } from 'vue';

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'>;

defineProps<Props>();

const emit = defineEmits<{ files: [files: File[]] } & FocusableEmits & ValidatableEmits>();

/**
 * The file input model. It is a list of files.
 */
const files = ref<File[]>([]);

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
    files.value = Array.from(input.files || []);

    emit('files', files.value);
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
    files.value = [];
    emit('files', files.value);
}

/**
 * Expose the focus and blur methods so they can be used directly via template references.
 */
defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    select,
    clear
});
</script>
