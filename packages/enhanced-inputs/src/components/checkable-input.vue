<template>
    <input
        ref="element"
        v-model="model"
        :type="type"
        :class="{ focused }"
        :value="value"
        :checked="checked"
        autocomplete="off"
        @blur="onBlur"
        @focus="onFocus"
    />
</template>

<script lang="ts" setup>
import type { StringCollection } from '@/functions/collections';
import { add as addToCollection, remove as removeFromCollection } from '@/functions/collections';
import { ref } from 'vue';
import type { FocusableEmits } from './types';

// TODO: ValidatableInputProps

const emit = defineEmits<FocusableEmits>(); // TODO: ValidatableEmits?

const { type = 'checkbox', value = null } = defineProps<{
    type?: 'checkbox' | 'radio';
    value?: string;
}>();

const element = ref<HTMLInputElement>();

const model = defineModel<Set<string> | string[] | boolean>();

/**
 * This (with the template property) is needed to enable programatically (un)checking the value
 */
const checked = ref<boolean>();

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
 *
 * @param event The native focus event.
 */
const onBlur = (event: FocusEvent): void => {
    focused.value = false;
    emit('blur', event);
};

/**
 * Expose the focus and blur methods so they can be used directly via template references.
 */
defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    check: () => {
        if (typeof model.value === 'boolean') {
            model.value = true;
            return;
        }

        if (!value) {
            console.warn(`Could not tick ${type}-item`, 'There is no value to set');
            return;
        }

        model.value = addToCollection(value, model.value as StringCollection);
        checked.value = true;
    },
    uncheck: () => {
        if (typeof model.value === 'boolean') {
            model.value = false;
            return;
        }

        if (!value) {
            console.warn(`Could not untick ${type}-item`, 'There is no value to unset');
            return;
        }

        model.value = removeFromCollection(value, model.value as StringCollection);
        checked.value = false;
    }
    // validate: () => validateModel()
});
</script>
