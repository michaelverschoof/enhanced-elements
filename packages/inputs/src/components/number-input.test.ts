import NumberInput from '@/components/number-input.vue';
import * as ModelFunctions from '@/util/model';
import { testFocus, testRefocus } from '@test/focus';
import { mountComponent } from '@test/util/mount';
import { testRequiredValidation } from '@test/validate';
import { mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const defaultProps = {
    name: 'testing-number-input',
    modelValue: '12345'
};

beforeAll(() => {
    expect(NumberInput).toBeTruthy();
});

const createFiltersSpy = vi.spyOn(ModelFunctions, 'createFilters');
const createModifiersSpy = vi.spyOn(ModelFunctions, 'createModifiers');
const transformSpy = vi.spyOn(ModelFunctions, 'transform');

afterEach(() => vi.clearAllMocks());

describe('Mounting components', () => {
    it('should mount the input component', async () => {
        const wrapper = mount(NumberInput, {
            props: defaultProps,
            attrs: { inputMode: 'numeric' }
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBeTruthy();
        expect(input.element.inputMode).toBe('numeric');
    });

    it('should mount with a filtered initial value', async () => {
        const { testModel } = mountNumberInput({ filters: /[^3]/g });
        expect(testModel.value).toBe('1245');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(transformSpy).toHaveBeenCalledOnce();
    });
});

// Call the focus/blur test-suite
testFocus(NumberInput, 'input', { ...defaultProps });
testRefocus(NumberInput, 'input', { ...defaultProps });

describe('Updating model value', () => {
    it('should update the model value', async () => {
        const { input, testModel } = mountNumberInput();

        await input.setValue('98765');
        expect(testModel.value).toBe('98765');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createFiltersSpy).toHaveBeenCalledWith([/[0-9]/g]);
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledWith([]);
        expect(transformSpy).toHaveBeenCalledTimes(2);
    });

    describe('Using default filters', () => {
        it('should filter the value using the default', async () => {
            const { input, testModel } = mountNumberInput();

            await input.setValue('Updated 98765');
            expect(testModel.value).toBe('98765');

            expect(createFiltersSpy).toHaveBeenCalledTimes(1);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });

        it('should not filter out decimal signs', async () => {
            const { input, testModel } = mountNumberInput({ allowedCharacters: '.,' });

            await input.setValue('12345.789');
            expect(testModel.value).toBe('12345.789');

            await input.setValue('12345,789');
            expect(testModel.value).toBe('12345,789');

            expect(createFiltersSpy).toHaveBeenCalledTimes(1);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should not filter out dashes', async () => {
            const { input, testModel } = mountNumberInput({ allowedCharacters: '-' });

            await input.setValue('123-456-789');
            expect(testModel.value).toBe('123-456-789');

            expect(createFiltersSpy).toHaveBeenCalledTimes(1);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe('Using filters', () => {
        it('should filter the value using regexes', async () => {
            const { wrapper, input, testModel } = mountNumberInput();

            // Filter the number 3
            await wrapper.setProps({ filters: /[^3]/g });
            await input.setValue('Updated with 12345');
            expect(testModel.value).toBe('1245');

            // Filter out the number 3 and then the number 5
            await wrapper.setProps({ filters: [/[^3]/g, /[^5]/g] });
            await input.setValue('Updated with 12345');
            expect(testModel.value).toBe('124');

            expect(createFiltersSpy).toHaveBeenCalledTimes(3);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should filter the value using functions', async () => {
            const { wrapper, input, testModel } = mountNumberInput();

            const filterFunction = (value: string) => (value.match(/[^3]/g) || []).join('');

            // Filter the number 3
            await wrapper.setProps({
                filters: filterFunction
            });
            await input.setValue('Updated with 12345');
            expect(testModel.value).toBe('1245');

            // Filter out numbers and then uppercase letters
            await wrapper.setProps({
                filters: [filterFunction, (value: string) => (value.match(/[^5]/g) || []).join('')]
            });
            await input.setValue('Updated with 12345');
            expect(testModel.value).toBe('124');

            expect(createFiltersSpy).toHaveBeenCalledTimes(3);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Using modifiers', () => {
        it('should modify the value using functions', async () => {
            const { wrapper, input, testModel } = mountNumberInput();

            // Double each number in the string
            await wrapper.setProps({
                modifiers: (value: string) =>
                    value
                        .split('')
                        .map((v) => Number(v) * 2)
                        .join('')
            });
            await input.setValue('123');
            expect(testModel.value).toBe('246');

            const doublerFunction = (value: string) =>
                value
                    .split('')
                    .map((v) => Number(v) * 2)
                    .join('');

            // Double each number in the string, twice
            await wrapper.setProps({ modifiers: [doublerFunction, doublerFunction] });
            await input.setValue('123');
            expect(testModel.value).toBe('4812');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledTimes(3);
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });
});

describe('Validating model value', () => {
    // Call the 'required' validation test-suite
    testRequiredValidation(NumberInput, 'input');

    it('should validate the model value', async () => {
        const { wrapper } = mountNumberInput();
        await wrapper.setProps({ validators: (value: string) => Number(value) > 10 });

        const component = wrapper.findComponent({ name: 'NumberInput' });
        const validation = component.vm.validate();
        expect(validation).toEqual({ valid: true, failed: [] });
    });

    it('should invalidate the model value', async () => {
        const { wrapper } = mountNumberInput();
        await wrapper.setProps({ validators: (value: string) => Number(value) < 10 });

        const component = wrapper.findComponent({ name: 'NumberInput' });
        const validation = component.vm.validate();
        expect(validation).toEqual({ valid: false, failed: [] });
    });
});

function mountNumberInput(customProps: Record<string, unknown> = {}) {
    const testModel = ref<string>('');

    const result = mountComponent<typeof NumberInput>(NumberInput, 'input', {
        ...defaultProps,
        ...customProps,
        'onUpdate:modelValue': (value: string) => (testModel.value = value)
    });

    return { ...result, testModel };
}
