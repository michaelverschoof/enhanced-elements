<template>
    <text-input ref="element" v-bind="$props" textarea />
</template>

<script setup lang="ts">
import TextInput from '@/components/text-input.vue';
import { TextareaHTMLAttributes, useTemplateRef } from 'vue';
import type { TransformableInputProps, ValidatableInputProps } from './types';

type Props = /* @vue-ignore */ TextareaHTMLAttributes & TransformableInputProps & ValidatableInputProps;

defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextInput>>('element');

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    validate: () => element.value?.validate()
});
</script>
