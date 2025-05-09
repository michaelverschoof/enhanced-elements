<template>
    <component
        ref="element"
        :is="textarea ? 'textarea' : 'input'"
        :value="model"
        :class="{ focused }"
        @input="onInput"
        @keypress="onKeypress"
        @paste.capture="onPaste"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>

<script setup lang="ts">
import type {
    FocusableEmits,
    TransformableInputProps,
    ValidatableEmits,
    ValidatableInputProps
} from '@/components/types';
import type { ModifierPreset, TransformFunction } from '@/functions/model';
import { createFilters, createModifiers, transform } from '@/functions/model';
import type { ValidationFunction } from '@/functions/validation';
import { createValidators, validate } from '@/functions/validation';
import { useDebounceFn } from '@vueuse/core';
import { computed, onBeforeMount, ref, useTemplateRef, watch } from 'vue';

// FIXME: InputHTMLAttributes/TextareaHTMLAttributes creates an error when running tests
// (InputHTMLAttributes | TextareaHTMLAttributes) & TransformableInputProps & { textarea?: boolean }
type Props = TransformableInputProps & ValidatableInputProps & { textarea?: boolean };

const emit = defineEmits<FocusableEmits & ValidatableEmits>();

const { filters = [], modifiers = [], validators = [] } = defineProps<Props>();

const element = useTemplateRef<HTMLInputElement>('element');

/**
 * The input model.
 *
 * It contains model modifiers:
 * - v-model.uppercase="model" : Automatically uppercases the value.
 * - v-model.lowercase="model" : Automatically lowercases the value.
 * FIXME: Figure out how to pass default Vue modifiers to the component
 */
const [model, modelModifiers] = defineModel<string, ModifierPreset>({
    set: (value: string): string => transform(value, ...filterFunctions.value, ...modifierFunctions.value)
});

/**
 * Validate the model value when it changes and emit the result.
 */
watch(model, () => validateModel());

/**
 * Reactive list of filters to execute when input is changed.
 */
const filterFunctions = computed<TransformFunction[]>(() => createFilters(filters));

/**
 * Reactive list of modifiers to execute when input is changed.
 */
const modifierFunctions = computed<TransformFunction[]>(() =>
    createModifiers([Object.keys(modelModifiers) as ModifierPreset[], modifiers].flat())
);

/**
 * Reactive list of validators to execute when the model is changed
 */
const validatorFunctions = computed<ValidationFunction[]>(() => createValidators(validators));

/**
 * Set the model value on input.
 * This is used instead of a direct `v-model` binding to allow dynamic components.
 *
 * @param event The native input event.
 */
const onInput = (event: InputEvent): void => {
    model.value = (<HTMLInputElement | HTMLTextAreaElement>event.target).value;
};

/**
 * Prevent the key input if a filter doesn't allow the character.
 *
 * @param event The native keyboard input event.
 */
const onKeypress = (event: KeyboardEvent): void => {
    if (filterFunctions.value.some((filter) => !filter(event.key))) {
        event.preventDefault();
    }
};

/**
 * Filter characters from the pasted data.
 *
 * @param event The native clipboard event.
 */
const onPaste = (event: ClipboardEvent): void => {
    event.preventDefault();
    const value = event.clipboardData?.getData('text') ?? '';
    const filtered = transform(value, ...filterFunctions.value);
    model.value = filtered;
    // event.clipboardData?.setData('text', filtered);
};

const focused = ref<boolean>();

/**
 * Trigger the "focused" class and emit the focus event when focused.
 *
 * @param event The native focus event.
 */
const onFocus = (event: FocusEvent): void => {
    focused.value = true;
    emit('focus', event);
};

/**
 * Remove the "focused" class and emit the blur event when blurred.
 * This is debounced in case the focus is reinstated on the element in the meantime.
 *
 * @param event The native focus event.
 */
const onBlur = useDebounceFn((event: FocusEvent): void => {
    if (document && document.activeElement === element.value) {
        return;
    }

    focused.value = false;
    emit('blur', event);
}, 100);

function validateModel(): void {
    emit('validated', validate(model.value ?? '', ...validatorFunctions.value));
}

/**
 * Trigger the model setter if there is an initial value and there are filters or modifiers.
 */
onBeforeMount(() => {
    if (!model.value || !(filterFunctions.value.length || modifierFunctions.value.length)) {
        return;
    }

    model.value = model.value;
});

/**
 * Expose the focus and blur methods so they can be used directly via template references.
 */
defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    validate: () => validateModel()
});
</script>
