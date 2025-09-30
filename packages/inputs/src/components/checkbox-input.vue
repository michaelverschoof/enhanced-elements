<template>
    <input
        ref="element"
        v-model="model"
        :value="value"
        :class="{ focused }"
        type="checkbox"
        @focus="onFocus"
        @blur="onBlur"
    />
</template>

<script lang="ts" setup>
import type { FocusableEmits, MaybeArray, ValidationResult } from '@/components/types';
import { useFocusable } from '@/composables/focus';
import { toArray } from '@/util/arrays';
import type { StringCollection } from '@/util/collections';
import { add as addToCollection, has, remove as removeFromCollection } from '@/util/collections';
import { replaceRequiredPreset, validate, ValidationFunction, ValidationPresets } from '@/util/validation';
import { computed, InputHTMLAttributes, useTemplateRef } from 'vue';

/**
 * Checkbox model
 */
export type CheckboxModel = StringCollection | boolean;

type ValidatableProp = { validators?: MaybeArray<ValidationPresets | ValidationFunction<CheckboxModel>> };

type Props = Omit</* @vue-ignore */ InputHTMLAttributes, 'type'> & ValidatableProp & { value?: string };

const { value, validators = [] } = defineProps<Props>();

const emit = defineEmits<FocusableEmits>();

const model = defineModel<CheckboxModel>();

const element = useTemplateRef<HTMLInputElement>('element');

/**
 * Composable for all inputs that have a "focused" state and corresponding emits.
 */
const { focused, onBlur, onFocus } = useFocusable(emit);

/**
 * Validator function for 'required' preset.
 */
const required: ValidationFunction<CheckboxModel> = (modelValue: CheckboxModel): boolean => {
    if (modelValue === undefined || typeof modelValue === 'boolean') {
        return !!modelValue;
    }

    if (!value) {
        console.warn('Could not validate checkbox-item.', 'There is no value to validate.');
        return false;
    }

    return has(value, modelValue);
};

/**
 * Reactive list of validators to execute when the model is changed.
 */
const validatorFunctions = computed<ValidationFunction<CheckboxModel>[]>(() =>
    replaceRequiredPreset(toArray(validators), required)
);

/**
 * Validate the model against the provided validators.
 */
function validateModel(): ValidationResult | void {
    if (model.value === null || model.value === undefined) {
        console.warn('Could not validate checkbox-item.', 'There is no model value.');
        return;
    }

    return validate(model.value, ...validatorFunctions.value);
}

/**
 * Set the model value according to the model type to check the checkbox
 */
function check(): void {
    if (typeof model.value === 'boolean') {
        model.value = true;
        return;
    }

    if (!value) {
        console.warn('Could not tick checkbox-item.', 'There is no value to set.');
        return;
    }

    model.value = addToCollection(value as string, model.value as StringCollection);
}

/**
 * Unset the model value according to the model type to uncheck the checkbox
 */
function uncheck(): void {
    if (typeof model.value === 'boolean') {
        model.value = false;
        return;
    }

    if (!value) {
        console.warn('Could not untick checkbox-item.', 'There is no value to unset.');
        return;
    }

    model.value = removeFromCollection(value as string, model.value as StringCollection);
}

/**
 * Expose the focus, blur, check and uncheck methods so they can be used directly via template references.
 */
defineExpose({
    focus: () => element.value?.focus(),
    blur: () => element.value?.blur(),
    check,
    uncheck,
    validate: validateModel
});
</script>
