import { VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Component, DefineComponent } from 'vue';
import type { ValidationResult } from '../src/components/types';
import { mountComponent } from './util/mount';

type ValidatableComponent = DefineComponent<{ validate: () => ValidationResult | undefined }>;

type ValidatableComponentWrapper = VueWrapper<ValidatableComponent>;

export function testRequiredValidation(component: Component, selector: string) {
    return describe('"required" validation', () => {
        it('should validate the model value', async () => {
            const { wrapper } = mountComponent(component, selector, { modelValue: 'test', validators: 'required' });

            const validation = (wrapper as ValidatableComponentWrapper).vm.validate();
            expect(validation).toEqual({ valid: true, failed: [] });
        });

        it('should invalidate the model value', async () => {
            const { wrapper } = mountComponent(component, selector, { modelValue: '', validators: 'required' });

            const validation = (wrapper as ValidatableComponentWrapper).vm.validate();
            expect(validation).toEqual({ valid: false, failed: [] });
        });

        it('should invalidate when missing a model value', async () => {
            const { wrapper } = mountComponent(component, selector, { modelValue: undefined, validators: 'required' });

            const validation = (wrapper as ValidatableComponentWrapper).vm.validate();
            expect(validation).toEqual({ valid: false, failed: [] });
        });
    });
}
