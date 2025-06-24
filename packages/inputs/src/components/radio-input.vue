<template>
    <input
        ref="element"
        v-model="model"
        :value="value"
        :class="{ focused }"
        type="radio"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>

<script lang="ts" setup>
import { useFocusable } from '@/composables/focus';
import { InputHTMLAttributes, ref } from 'vue';
import type { FocusableEmits } from './types';

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> & { value?: string | unknown };

const { value } = defineProps<Props>();

const emit = defineEmits<FocusableEmits>();

// As objects and other values are allowed, specifically typing these is not possible.
const model = defineModel<unknown>();

const element = ref<HTMLInputElement>();

/**
 * Composable for all inputs that have a "focused" state and corresponding emits.
 */
const { focused, onBlur, onFocus } = useFocusable(emit);
/**
 * Set the model value according to the model type to check the checkbox.
 */
function check(): void {
    model.value = value;
}

/**
 * Unset the model value according to the model type to uncheck the checkbox.
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
