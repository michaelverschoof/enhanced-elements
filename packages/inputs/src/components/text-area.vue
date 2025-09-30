<template>
    <text-input ref="element" v-bind="$props" textarea />
</template>

<script setup lang="ts">
import TextInput from '@/components/text-input.vue';
import { ValidationFunction, ValidationPresets } from '@/util/validation';
import { TextareaHTMLAttributes, useTemplateRef } from 'vue';
import type { MaybeArray, TransformableInputProps } from './types';

type ValidatableProp = { validators?: MaybeArray<ValidationPresets | ValidationFunction<string>> };

type Props = /* @vue-ignore */ TextareaHTMLAttributes & TransformableInputProps & ValidatableProp;

defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextInput>>('element');

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    validate: () => element.value?.validate()
});
</script>
