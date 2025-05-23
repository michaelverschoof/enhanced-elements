import NumericInput from '@/components/numeric-input.vue';
import * as ModelFunctions from '@/functions/model';
import { emittedNativeEvents } from '@test/emits';
import { mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

const defaultProps = {
    name: 'testing-numeric-input'
};

beforeAll(() => {
    expect(NumericInput).toBeTruthy();
});

const createFiltersSpy = vi.spyOn(ModelFunctions, 'createFilters');
const createModifiersSpy = vi.spyOn(ModelFunctions, 'createModifiers');
const transformSpy = vi.spyOn(ModelFunctions, 'transform');

afterEach(() => vi.clearAllMocks());

describe('Mounting components', () => {
    it('should mount the input component', async () => {
        const wrapper = mount(NumericInput, {
            props: defaultProps,
            attrs: { inputMode: 'numeric' }
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBeTruthy();
        expect(input.element.inputMode).toBe('numeric');
    });

    it('should mount with a filtered initial value', async () => {
        const { testModelValue } = mountComponent({ filters: /[^3]/g });

        expect(testModelValue.value).toBe('1245');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(transformSpy).toHaveBeenCalledOnce();
    });
});

// FIXME: Use same test functions that textual area uses
describe('Focusing/blurring components', () => {
    describe('On focus', () => {
        it('should focus using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            expect(input.element).not.toBe(document.activeElement);

            const component = wrapper.findComponent({ ref: 'element' }).vm;
            component.focus();
            expect(input.element).toBe(document.activeElement);

            const emitted = emittedNativeEvents<FocusEvent>(wrapper, 'focus', 1);
            expect(emitted).not.toBeNull();
            expect(emitted![0].type).toEqual('focus');
        });
    });

    describe('On blur', () => {
        it('should blur using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            expect(input.element).not.toBe(document.activeElement);

            const component = wrapper.findComponent({ ref: 'element' }).vm;
            component.focus();
            expect(input.element).toBe(document.activeElement);

            let emitted = emittedNativeEvents<FocusEvent>(wrapper, 'focus', 1);
            expect(emitted![0].type).toEqual('focus');

            component.blur();
            expect(input.element).not.toBe(document.activeElement);

            emitted = emittedNativeEvents<FocusEvent>(wrapper, 'blur', 1);
            expect(emitted![0].type).toEqual('blur');
        });
    });
});

describe('Updating model value', () => {
    it('should update the model value', async () => {
        const { input, testModelValue } = mountComponent();

        await input.setValue('98765');
        expect(testModelValue.value).toBe('98765');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createFiltersSpy).toHaveBeenCalledWith([/[0-9]/g]);
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledWith([]);
        expect(transformSpy).toHaveBeenCalledTimes(2);
    });

    describe('Using default filters', () => {
        it('should filter the value using the default', async () => {
            const { input, testModelValue } = mountComponent();

            await input.setValue('Updated 98765');
            expect(testModelValue.value).toBe('98765');

            expect(createFiltersSpy).toHaveBeenCalledTimes(1);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });

        it('should not filter out decimal signs', async () => {
            const { input, testModelValue } = mountComponent({ allowedCharacters: '.,' });

            await input.setValue('12345.789');
            expect(testModelValue.value).toBe('12345.789');

            await input.setValue('12345,789');
            expect(testModelValue.value).toBe('12345,789');

            expect(createFiltersSpy).toHaveBeenCalledTimes(1);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should not filter out dashes', async () => {
            const { input, testModelValue } = mountComponent({ allowedCharacters: '-' });

            await input.setValue('123-456-789');
            expect(testModelValue.value).toBe('123-456-789');

            expect(createFiltersSpy).toHaveBeenCalledTimes(1);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });
    });

    describe('Using filters', () => {
        it('should filter the value using regexes', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            // Filter the number 3
            await wrapper.setProps({ filters: /[^3]/g });
            await input.setValue('Updated with 12345');
            expect(testModelValue.value).toBe('1245');

            // Filter out the number 3 and then the number 5
            await wrapper.setProps({ filters: [/[^3]/g, /[^5]/g] });
            await input.setValue('Updated with 12345');
            expect(testModelValue.value).toBe('124');

            expect(createFiltersSpy).toHaveBeenCalledTimes(3);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should filter the value using functions', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            const filterFunction = (value: string) => (value.match(/[^3]/g) || []).join('');

            // Filter the number 3
            await wrapper.setProps({
                filters: filterFunction
            });
            await input.setValue('Updated with 12345');
            expect(testModelValue.value).toBe('1245');

            // Filter out numbers and then uppercase letters
            await wrapper.setProps({
                filters: [filterFunction, (value: string) => (value.match(/[^5]/g) || []).join('')]
            });
            await input.setValue('Updated with 12345');
            expect(testModelValue.value).toBe('124');

            expect(createFiltersSpy).toHaveBeenCalledTimes(3);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Using modifiers', () => {
        it('should modify the value using functions', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            // Double each number in the string
            await wrapper.setProps({
                modifiers: (value: string) =>
                    value
                        .split('')
                        .map((v) => Number(v) * 2)
                        .join('')
            });
            await input.setValue('123');
            expect(testModelValue.value).toBe('246');

            const doublerFunction = (value: string) =>
                value
                    .split('')
                    .map((v) => Number(v) * 2)
                    .join('');

            // Double each number in the string, twice
            await wrapper.setProps({ modifiers: [doublerFunction, doublerFunction] });
            await input.setValue('123');
            expect(testModelValue.value).toBe('4812');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledTimes(3);
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });
});

function mountComponent(customProps?: Record<string, unknown> | null, args?: Record<string, unknown>) {
    const testModelValue = ref<string>('');

    const wrapper = mount(NumericInput, {
        props: {
            ...defaultProps,
            modelValue: '12345',
            'onUpdate:modelValue': (value: string) => (testModelValue.value = value as string),
            ...(customProps ?? {})
        },
        ...args
    });

    // Get the input
    const input = wrapper.find('input');

    // Perform base tests
    expect(input.exists()).toBeTruthy();

    return { wrapper, input, testModelValue };
}

function mountCallableComponent() {
    const wrapper = mount(
        defineComponent({
            components: { NumericInput },
            template: `<numeric-input ref="element" name="${defaultProps.name}" />`
        }),
        { attachTo: document.body }
    );

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();

    return { wrapper, input };
}
