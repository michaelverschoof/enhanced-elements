<template>
    <input
        ref="element"
        v-model="model"
        :value="value"
        :class="{ focused }"
        type="checkbox"
        autocomplete="off"
        @blur="onBlur"
        @focus="onFocus"
    />
</template>

<script lang="ts" setup>
import type { StringCollection } from '@/functions/collections';
import { add as addToCollection, remove as removeFromCollection } from '@/functions/collections';
import { ref } from 'vue';
import type { FocusableEmits } from './types';

const emit = defineEmits<FocusableEmits>();

const { value = false } = defineProps<{ value?: string | boolean }>();

const model = defineModel<Set<string> | string[] | boolean>();

const element = ref<HTMLInputElement>();

const focused = ref<boolean>();

/**
 * Trigger the "focused" class and emit the focus event when focused.
 *
 * @param event The native focus event.
 */
function onFocus(event: FocusEvent): void {
    focused.value = true;
    emit('focus', event);
}

/**
 * Remove the "focused" class and emit the blur event when blurred.
 *
 * @param event The native focus event.
 */
function onBlur(event: FocusEvent): void {
    focused.value = false;
    emit('blur', event);
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
        console.warn(`Could not tick checkbox-item.`, 'There is no value to set.');
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
        console.warn(`Could not untick checkbox-item.`, 'There is no value to unset.');
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
    uncheck
});
</script>
