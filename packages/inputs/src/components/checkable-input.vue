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
import type { StringCollection } from '@/functions/collections';
import { add as addToCollection, remove as removeFromCollection } from '@/functions/collections';
import { InputHTMLAttributes, ref } from 'vue';
import type { FocusableEmits } from './types';

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> & { value?: string | boolean };

const { value = false } = defineProps<Props>();

const emit = defineEmits<FocusableEmits>();

const model = defineModel<Set<string> | string[] | boolean>();

const element = ref<HTMLInputElement>();

/**
 * Composable for all inputs that have a "focused" state and corresponding emits.
 */
const { focused, onBlur, onFocus } = useFocusable(emit);

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
