<template>
    <input
        ref="element"
        v-model="model"
        :value="value"
        :class="{ focused: focusable.focused }"
        type="radio"
        @focus="focusable.onFocus"
        @blur="focusable.onBlur"
    />
</template>

<script lang="ts" setup>
import { useFocusable } from '@/composables/focus';
import { ref } from 'vue';
import type { FocusableEmits } from './types';

const emit = defineEmits<FocusableEmits>();

const { value } = defineProps<{ value?: string | unknown }>();

// As objects and other values are allowed, specifically typing these is not possible.
const model = defineModel<unknown>();

const element = ref<HTMLInputElement>();

/**
 * Composable for all inputs that have a "focused" state and corresponding emits.
 */
const focusable = useFocusable(emit);

/**
 * Set the model value according to the model type to check the checkbox
 */
function check(): void {
    model.value = value;
}

/**
 * Unset the model value according to the model type to uncheck the checkbox
 */
function uncheck(): void {
    model.value = undefined;
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
