import TextualArea from '@/components/textual-area.vue';
import * as ModelFunctions from '@/functions/model';
import { testBlurFunction, testBlurNative, testFocusFunction, testFocusNative, testRefocus } from '@test/input-tests';
import { mount } from '@vue/test-utils';
import type { MockInstance } from 'vitest';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

/**
 * @vitest-environment happy-dom
 */

const defaultProps = {
    name: 'testing-textual-area'
};

beforeAll(() => {
    expect(TextualArea).toBeTruthy();
});

let createFiltersSpy: MockInstance<typeof ModelFunctions.createFilters>;
let createModifiersSpy: MockInstance<typeof ModelFunctions.createModifiers>;
let transformSpy: MockInstance<typeof ModelFunctions.transform>;

beforeEach(() => {
    createFiltersSpy = vi.spyOn(ModelFunctions, 'createFilters');
    createModifiersSpy = vi.spyOn(ModelFunctions, 'createModifiers');
    transformSpy = vi.spyOn(ModelFunctions, 'transform');
});

afterEach(() => vi.restoreAllMocks());

describe('Mounting components', () => {
    it('should mount the textarea component', async () => {
        const wrapper = mount(TextualArea, { props: defaultProps });
        expect(wrapper.find('textarea').exists()).toBeTruthy();
    });

    it('should mount with a filtered initial value', async () => {
        const { testModelValue } = mountComponent({ filters: /[^i]/g });

        expect(testModelValue.value).toBe('ntal');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(transformSpy).toHaveBeenCalledOnce();
    });
});

describe('Focusing/blurring components', () => {
    describe('On focus', () => {
        it('should focus natively', async () => {
            const { wrapper, input } = mountComponent(null, { attachTo: document.body });
            testFocusNative(wrapper, input);
        });

        it('should focus using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            testFocusFunction(wrapper, input);
        });
    });

    describe('On blur', () => {
        it('should blur natively', async () => {
            const { wrapper, input } = mountComponent(null, { attachTo: document.body });
            testBlurNative(wrapper, input);
        });

        it('should blur using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            testBlurFunction(wrapper, input);
        });

        it('should keep focus when focusing quickly after blurring', async () => {
            const { wrapper, input } = mountComponent(null, { attachTo: document.body });
            testRefocus(wrapper, input);
        });
    });
});

describe('Updating model value', () => {
    it('should update the model value', async () => {
        const { input, testModelValue } = mountComponent();

        await input.setValue('updated value');
        expect(testModelValue.value).toBe('updated value');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createFiltersSpy).toHaveBeenCalledWith([]);
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledWith([]);
        expect(transformSpy).toHaveBeenCalledOnce();
    });

    describe('Using filters', () => {
        it('should filter the value using presets', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            // Filter out letters
            await wrapper.setProps({ filters: 'letters' });
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe(' 12345');

            // Filter out numbers
            await wrapper.setProps({ filters: 'numbers' });
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe('updated ');

            // Filter out numbers and then letters
            await wrapper.setProps({ filters: ['numbers', 'letters'] });
            await input.setValue('$updated-12345_');
            expect(testModelValue.value).toBe('$-_');

            // Once for the inital value and thrice for the updates to the filters
            expect(createFiltersSpy).toHaveBeenCalledTimes(4);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should filter the value using regexes', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            // Filter letters only
            await wrapper.setProps({ filters: /[^A-Z]/g });
            await input.setValue('UPDATED with 12345');
            expect(testModelValue.value).toBe(' with 12345');

            // Filter numbers only
            await wrapper.setProps({ filters: /[^0-9]/g });
            await input.setValue('UPDATED with 12345');
            expect(testModelValue.value).toBe('UPDATED with ');

            // Filter out numbers and then uppercase letters
            await wrapper.setProps({ filters: [/[^0-9]/g, /[^A-Z]/g] });
            await input.setValue('UPDATED with 12345');
            expect(testModelValue.value).toBe(' with ');

            expect(createFiltersSpy).toHaveBeenCalledTimes(4);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should filter the value using functions', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            // Filter spaces
            await wrapper.setProps({
                filters: (value: string) => (value.match(/[^ ]/g) || []).join('')
            });
            await input.setValue('UPDATED with 12345');
            expect(testModelValue.value).toBe('UPDATEDwith12345');

            // Filter dashes
            await wrapper.setProps({
                filters: (value: string) => (value.match(/[^-]/g) || []).join('')
            });
            await input.setValue('UPDATED-with-12345');
            expect(testModelValue.value).toBe('UPDATEDwith12345');

            // Filter out numbers and then uppercase letters
            await wrapper.setProps({
                filters: [
                    (value: string) => (value.match(/[^ ]/g) || []).join(''),
                    (value: string) => (value.match(/[^-]/g) || []).join('')
                ]
            });
            await input.setValue('UPDATED-with 12345');
            expect(testModelValue.value).toBe('UPDATEDwith12345');

            expect(createFiltersSpy).toHaveBeenCalledTimes(4);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Using modifiers', () => {
        it('should modify the value using presets', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            // Convert to lowercase
            await wrapper.setProps({ modifiers: 'lowercase' });
            await input.setValue('UPDATED 12345');
            expect(testModelValue.value).toBe('updated 12345');

            // Convert to uppercase
            await wrapper.setProps({ modifiers: 'uppercase' });
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe('UPDATED 12345');

            // Convert to lowercase and then uppercase
            await wrapper.setProps({ modifiers: ['lowercase', 'uppercase'] });
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe('UPDATED 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledTimes(4);
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should modify the value using functions', async () => {
            const { wrapper, input, testModelValue } = mountComponent();

            // Get the first 7 characters
            await wrapper.setProps({ modifiers: (value: string) => value.substring(0, 7) });
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe('updated');

            // Get the last 5 characters
            await wrapper.setProps({ modifiers: (value: string) => value.slice(-5) });
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe('12345');

            // Remove the first 3 and then the last 3 characters
            await wrapper.setProps({
                modifiers: [
                    (value: string) => value.substring(3),
                    (value: string) => value.substring(0, value.length - 3)
                ]
            });
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe('ated 12');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledTimes(4);
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Using model modifiers', () => {
        it('should uppercase the value', async () => {
            const { input, testModelValue } = mountComponent({
                modelModifiers: { uppercase: true }
            });

            // Convert to uppercase
            await input.setValue('updated 12345');
            expect(testModelValue.value).toBe('UPDATED 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });

        it('should lowercase the value', async () => {
            const { input, testModelValue } = mountComponent({
                modelModifiers: { lowercase: true }
            });

            // Convert to lowercase
            await input.setValue('UPDATED 12345');
            expect(testModelValue.value).toBe('updated 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });

        it('should lowercase then uppercase the value', async () => {
            const { input, testModelValue } = mountComponent({
                modelModifiers: { lowercase: true, uppercase: true }
            });

            // Convert to lowercase and then to uppercase
            await input.setValue('UPDATED 12345');
            expect(testModelValue.value).toBe('UPDATED 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });
    });
});

describe('Filtering input', () => {
    describe('Filtering keys', () => {
        // FIXME: The code is touched so coverage works, but the expects are incorrect
        it.skip('should not prevent allowed characters', async () => {
            const { wrapper, input, testModelValue } = mountComponent(null, {
                attachTo: document.body
            });

            await wrapper.setProps({ filters: 'numbers' });

            input.element.focus();
            expect(input.element).toBe(document.activeElement);

            await input.setValue('');
            await input.trigger('keypress', { key: 'a' });
            await input.trigger('keyup', { key: 'a' });
            await input.trigger('change');
            expect(testModelValue.value).toBe('a');

            await input.trigger('keypress', { key: '9' });
            expect(testModelValue.value).toBe('a');

            // expect(testModelValue.value).toBe('');

            expect(createFiltersSpy).toHaveBeenCalledTimes(2);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledOnce();
        });
    });

    describe('Filtering paste', () => {
        // FIXME: The code is touched so coverage works, but the expects are incorrect
        it.skip('should filter characters', async () => {
            const { wrapper, input, testModelValue } = mountComponent(null, {
                attachTo: document.body
            });

            await wrapper.setProps({ filters: /[^A-Z]/g });

            await input.trigger('paste', {
                clipboardData: {
                    getData: () => 'UPDATED with 12345',
                    setData: (format: 'text', value: string) => {
                        console.log('Filtered paste data', value);
                    }
                }
            });

            expect(testModelValue.value).toBe('initial');
            // expect(testModelValue.value).toBe('initial with 12345');
            // expect(wrapper.find('textarea').element.value).toBe('initial with 12345');

            expect(createFiltersSpy).toHaveBeenCalledTimes(2);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledOnce();
        });

        it.skip('should not filter characters when clipboard is empty', async () => {});

        it.skip('should not filter characters when clipboard is null', async () => {});
    });
});

function mountComponent(customProps?: Record<string, unknown> | null, args?: Record<string, unknown>) {
    const testModelValue = ref<string>('');

    const wrapper = mount(TextualArea, {
        props: {
            ...defaultProps,
            modelValue: 'initial',
            'onUpdate:modelValue': (value: unknown) => (testModelValue.value = value as string),
            ...(customProps ?? {})
        },
        ...args
    });

    // Get the input
    const input = wrapper.find('textarea');

    // Perform base tests
    expect(input.exists()).toBeTruthy();

    if (customProps && !('filters' in customProps) && !('modelModifiers' in customProps)) {
        expect(testModelValue.value).toBe('initial');
    }

    return { wrapper, input, testModelValue };
}

function mountCallableComponent() {
    const wrapper = mount(
        defineComponent({
            components: { TextualArea: TextualArea },
            template: `<textual-area ref="element" name="${defaultProps.name}" />`
        }),
        { attachTo: document.body }
    );

    const input = wrapper.find('textarea');
    expect(input.exists()).toBeTruthy();

    return { wrapper, input };
}
