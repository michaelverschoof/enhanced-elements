import CheckboxInput from '@/components/checkbox-input.vue';
import { StringCollection } from '@/util/collections';
import { testFocus } from '@test/focus';
import { mountComponent } from '@test/util/mount';
import { DOMWrapper, mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const warnSpy = vi.spyOn(console, 'warn').mockImplementation(vi.fn());

const defaultProps = {
    name: 'testing-checkbox-input'
};

beforeAll(() => {
    expect(CheckboxInput).toBeTruthy();
});

afterEach(() => vi.clearAllMocks());

describe('Mounting components', () => {
    it('should mount the checkbox component', async () => {
        const wrapper = mount(CheckboxInput, { props: defaultProps });
        const input = wrapper.find('input');
        expect(input.exists()).toBeTruthy();
        expect(input.element.type).toBe('checkbox');
        expect(input.element.checked).toBe(false);
    });

    describe('Mounting with checked initial values', async () => {
        it('should mount with a checked boolean value', async () => {
            const { input } = mountCheckboxInput({ modelValue: true });
            expect(input.element.checked).toBe(true);
        });

        it('should mount with a checked array value', async () => {
            const { input } = mountCheckboxInput({ value: 'test', modelValue: ['test'] });
            expect(input.element.value).toBe('test');
            expect(input.element.checked).toBe(true);
        });

        it('should mount with a checked Set value', async () => {
            const { input } = mountCheckboxInput({ value: 'test', modelValue: new Set(['test']) });
            expect(input.element.value).toBe('test');
            expect(input.element.checked).toBe(true);
        });
    });
});

// Call the focus/blur test-suite
testFocus(CheckboxInput, 'input', { ...defaultProps });

describe('Checking/unchecking components', () => {
    describe('Checking', () => {
        it('should check using click', async () => {
            const { input } = mountCheckboxInput();

            await input.trigger('click');
            expect(input.element.checked).toBe(true);
        });

        describe('Checking using function', () => {
            it('should check boolean model value', async () => {
                const { wrapper, testModel } = mountCheckboxInput({ modelValue: false });
                expect(testModel.value).toBe(false);

                await wrapper.vm.check();

                expect(testModel.value).toBe(true);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should check array model value', async () => {
                const { wrapper, testModel } = mountCheckboxInput({ value: 'test', modelValue: [] });
                expect(testModel.value).toEqual([]);

                await wrapper.vm.check();

                expect(testModel.value).toEqual(['test']);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should give a warning when the value is not set', async () => {
                const { wrapper, input, testModel } = mountCheckboxInput();
                expect(testModel.value).toBeUndefined();
                expect(input.element.checked).toBe(false);

                await wrapper.vm.check();

                expect(testModel.value).toBeUndefined();
                expect(input.element.checked).toBe(false);

                expect(warnSpy).toBeCalledWith('Could not tick checkbox-item.', 'There is no value to set.');
            });
        });

        it('should check using model value', async () => {
            const { wrapper, testModel } = mountCheckboxInput({ value: 'test' });
            expect(testModel.value).toBeUndefined();

            await wrapper.setValue(true);

            expect(testModel.value).toBe(true);
            expect(warnSpy).not.toHaveBeenCalled();
        });
    });

    describe('Unchecking', () => {
        it('should uncheck using click', async () => {
            const { input } = mountCheckboxInput();

            await input.trigger('click');
            expect(input.element.checked).toBe(true);

            await input.trigger('click');
            expect(input.element.checked).toBe(false);
        });

        describe('Unchecking using function', () => {
            it('should uncheck boolean value', async () => {
                const { wrapper, testModel } = mountCheckboxInput({ modelValue: true });
                expect(testModel.value).toBe(true);

                await wrapper.vm.uncheck();

                expect(testModel.value).toBe(false);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should uncheck string array model value', async () => {
                const { wrapper, testModel } = mountCheckboxInput({ value: 'test', modelValue: ['test'] });
                expect(testModel.value).toEqual(['test']);

                await wrapper.vm.uncheck();

                expect(testModel.value).toEqual([]);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should give a warning when the value is not set', async () => {
                const { wrapper, testModel } = mountCheckboxInput({ value: undefined, modelValue: [] });
                expect(testModel.value).toEqual([]);

                await wrapper.vm.uncheck();

                expect(testModel.value).toEqual([]);
                expect(warnSpy).toBeCalledWith('Could not untick checkbox-item.', 'There is no value to unset.');
            });
        });

        it('should uncheck using model value', async () => {
            const { wrapper, testModel } = mountCheckboxInput({ value: 'test', modelValue: ['test'] });
            expect(testModel.value).toEqual(['test']);

            await wrapper.setValue([]);

            expect(testModel.value).toEqual([]);
            expect(warnSpy).not.toHaveBeenCalled();
        });
    });
});

describe('Validating model value', () => {
    describe('boolean validation', () => {
        it('should validate the model value', async () => {
            const { wrapper } = mountCheckboxInput({
                modelValue: true,
                validators: 'required'
            });

            const validation = wrapper.vm.validate();
            expect(validation).toEqual({ valid: true, failed: [] });
        });

        it('should invalidate the model value', async () => {
            const { wrapper } = mountCheckboxInput({
                modelValue: false,
                validators: 'required'
            });

            const validation = wrapper.vm.validate();
            expect(validation).toEqual({ valid: false, failed: [] });
        });
    });

    // TODO: Can we make the generic "required" validation work for this as well?
    describe('string collection validation', () => {
        it('should validate the model value', async () => {
            const { wrapper } = mountCheckboxInput({
                modelValue: ['test'],
                value: 'test',
                validators: 'required'
            });

            const validation = wrapper.vm.validate();
            expect(validation).toEqual({ valid: true, failed: [] });
        });

        it('should invalidate the model value', async () => {
            const { wrapper } = mountCheckboxInput({
                modelValue: ['test'],
                value: 'other',
                validators: 'required'
            });

            const validation = wrapper.vm.validate();
            expect(validation).toEqual({ valid: false, failed: [] });
        });

        it('should invalidate the model value', async () => {
            const { wrapper } = mountCheckboxInput({
                modelValue: [],
                value: null,
                validators: 'required'
            });

            const validation = wrapper.vm.validate();
            expect(validation).toEqual({ valid: false, failed: [] });
        });
    });

    it('should give a warning when the model value is unset', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(vi.fn());

        const { wrapper } = mountCheckboxInput({
            modelValue: null,
            validators: 'required'
        });

        const validation = wrapper.vm.validate();
        expect(validation).toBeUndefined();
        expect(warnSpy).toHaveBeenCalledOnce();
        expect(warnSpy).toHaveBeenCalledWith('Could not validate checkbox-item.', 'There is no model value.');
    });
});

type CheckboxValues = boolean | StringCollection;

function mountCheckboxInput(customProps: Record<string, unknown> = {}) {
    const testModel = ref<CheckboxValues>(customProps.modelValue as CheckboxValues);

    const result = mountComponent<typeof CheckboxInput>(CheckboxInput, 'input', {
        ...defaultProps,
        ...customProps,
        modelValue: testModel.value,
        'onUpdate:modelValue': (value: CheckboxValues) => (testModel.value = value)
    });

    return {
        wrapper: result.wrapper,
        input: result.input as DOMWrapper<HTMLInputElement>,
        testModel
    };
}
