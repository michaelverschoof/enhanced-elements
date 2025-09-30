<template>
    <text-input ref="element" v-bind="$props" :filters="adjustedFilters" :modifiers="adjustedModifiers" />
</template>

<script setup lang="ts">
import TextInput from '@/components/text-input.vue';
import type { MaybeArray, TransformableInputProps } from '@/components/types';
import { filterPresets, Modifier, type Filter } from '@/util/model';
import { ValidationFunction, ValidationPresets } from '@/util/validation';
import { computed, InputHTMLAttributes, useTemplateRef } from 'vue';

type ValidatableProp = { validators?: MaybeArray<ValidationPresets | ValidationFunction> };

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> &
    TransformableInputProps &
    ValidatableProp & { allowedCharacters?: string };

const { filters = [], modifiers = [], allowedCharacters = '' } = defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextInput>>('element');

const adjustedFilters = computed<Filter[]>(() =>
    [new RegExp(`[0-9${allowedCharacters}]`, 'g'), filterPresets<Filter>(filters)].flat()
);

const adjustedModifiers = computed<Modifier[]>(() => filterPresets<Modifier>(modifiers).flat());

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    validate: () => element.value?.validate()
});
</script>
