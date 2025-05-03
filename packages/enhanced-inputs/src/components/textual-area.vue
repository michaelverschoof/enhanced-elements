<template>
    <textual-input ref="element" v-bind="$props" textarea />
</template>

<script setup lang="ts">
import TextualInput from '@/components/textual-input.vue';
import { useTemplateRef } from 'vue';
import type { TransformableInputProps } from './types';

// FIXME: TextareaHTMLAttributes creates an error when running tests
// TextareaHTMLAttributes & TransformableInputProps
defineProps<TransformableInputProps>();

const element = useTemplateRef<InstanceType<typeof TextualInput>>('element');

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur()
});
</script>
