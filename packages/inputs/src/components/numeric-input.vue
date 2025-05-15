<template>
    <textual-input ref="element" :filters="combinedFilters" :modifiers="modifiers" />
</template>

<script setup lang="ts">
import TextualInput from '@/components/textual-input.vue';
import type { TransformableInputProps } from '@/components/types';
import type { Filters } from '@/functions/model';
import { computed, useTemplateRef } from 'vue';

// FIXME: InputHTMLAttributes creates an error when running tests
// InputHTMLAttributes & TransformableInputProps & { allowedCharacters?: string };
type Props = TransformableInputProps & { allowedCharacters?: string };

const { filters = [], modifiers = [], allowedCharacters = '' } = defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextualInput>>('element');

const combinedFilters = computed<Filters[]>(() => [new RegExp(`[0-9${allowedCharacters}]`, 'g'), filters].flat());

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur()
});
</script>
