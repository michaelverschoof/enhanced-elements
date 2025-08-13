<template>
    <textual-input ref="element" v-bind="$props" :filters="adjustedFilters" :modifiers="adjustedModifiers" />
</template>

<script setup lang="ts">
import TextualInput from '@/components/textual-input.vue';
import type { TransformableInputProps, ValidatableInputProps } from '@/components/types';
import { filterPresets, Modifier, type Filter } from '@/functions/model';
import { computed, InputHTMLAttributes, useTemplateRef } from 'vue';

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> &
    TransformableInputProps &
    ValidatableInputProps & { allowedCharacters?: string };

const { filters = [], modifiers = [], allowedCharacters = '' } = defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextualInput>>('element');

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
