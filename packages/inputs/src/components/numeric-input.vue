<template>
    <textual-input ref="element" :filters="combinedFilters" :modifiers="modifiers" />
</template>

<script setup lang="ts">
import TextualInput from '@/components/textual-input.vue';
import type { TransformableInputProps } from '@/components/types';
import type { Filters } from '@/functions/model';
import { computed, InputHTMLAttributes, useTemplateRef } from 'vue';

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> &
    TransformableInputProps & { allowedCharacters?: string };

const { filters = [], modifiers = [], allowedCharacters = '' } = defineProps<Props>();

const element = useTemplateRef<InstanceType<typeof TextualInput>>('element');

const combinedFilters = computed<Filters[]>(() => [new RegExp(`[0-9${allowedCharacters}]`, 'g'), filters].flat());

defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur()
});
</script>
