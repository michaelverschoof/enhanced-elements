import RadioInput from '@/components/radio-input.vue';
import { testFocus, testRefocus } from '@test/focus';
import { mountComponent } from '@test/util/mount';
import { DOMWrapper, mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

const defaultProps = {
    name: 'testing-radio-input',
    value: 'test'
};

beforeAll(() => {
    expect(RadioInput).toBeTruthy();
});

afterEach(() => vi.clearAllMocks());

describe('Mounting components', () => {
    it('should mount the radio component', async () => {
        const wrapper = mount(RadioInput, { props: defaultProps });
        const input = wrapper.find('input');

        expect(input.exists()).toBeTruthy();
        expect(input.element.type).toBe('radio');
        expect(input.element.checked).toBe(false);
    });

    describe('Mounting with checked initial values', async () => {
        it('should mount with a checked string value', async () => {
            const { input, testModel } = mountRadioInput({ modelValue: 'test' });
            expect(testModel.value).toBe('test');
            expect(input.element.checked).toBe(true);
        });

        it('should mount with a checked object value', async () => {
            const { input, testModel } = mountRadioInput({
                value: { foo: 'test' },
                modelValue: { foo: 'test' }
            });
            expect(testModel.value).toEqual({ foo: 'test' });
            expect(input.element.checked).toBe(true);
        });
    });
});

// Call the focus/blur test-suite
testFocus(RadioInput, 'input', { ...defaultProps });
testRefocus(RadioInput, 'input', { ...defaultProps });

describe('Checking/unchecking components', () => {
    describe('Checking', () => {
        describe('Single item', () => {
            it('should check using click', async () => {
                const { input, testModel } = mountRadioInput();
                expect(testModel.value).toBeUndefined();

                await input.trigger('click');
                expect(testModel.value).toBe('test');
            });

            it('should check using model value', async () => {
                const { wrapper, testModel } = mountRadioInput();
                expect(testModel.value).toBeUndefined();

                await wrapper.setValue('test');
                expect(testModel.value).toBe('test');
            });

            it('should check using function', async () => {
                const { wrapper, testModel } = mountRadioInput();
                expect(testModel.value).toBeUndefined();

                await wrapper.vm.check();
                expect(testModel.value).toBe('test');
            });
        });

        describe('Multiple items', () => {
            it('should switch value using click', async () => {
                const testModel = ref<string>();

                const wrapper = mount(
                    defineComponent({
                        components: { RadioInput },
                        template: `
                        <radio-input v-model="model" value="one" :data-is-checked="model === 'one'" name="${defaultProps.name}" />
                        <radio-input v-model="model" value="two" :data-is-checked="model === 'two'" name="${defaultProps.name}" />
                        <radio-input v-model="model" value="three" :data-is-checked="model === 'three'" name="${defaultProps.name}" />
                    `,
                        data: () => ({ model: testModel })
                    }),
                    { attachTo: document.body }
                );

                expect(testModel.value).toBeUndefined();

                const inputs = wrapper.findAll('input');
                expect(inputs.length).toBe(3);

                let currentInput = inputs[2];

                await currentInput.trigger('click');
                await currentInput.trigger('change');
                expect(testModel.value).toBe('three');
                expect(currentInput.element.dataset.isChecked).toBe('true');

                currentInput = inputs[1];

                await currentInput.trigger('click');
                await currentInput.trigger('change');
                expect(testModel.value).toBe('two');
                expect(currentInput.element.dataset.isChecked).toBe('true');

                currentInput = inputs[0];

                await currentInput.trigger('click');
                await currentInput.trigger('change');
                expect(testModel.value).toBe('one');
                expect(currentInput.element.dataset.isChecked).toBe('true');
            });

            it('should switch value using model value', async () => {
                const testModel = ref<string>();

                const wrapper = mount(
                    defineComponent({
                        components: { RadioInput },
                        template: `
                        <radio-input v-model="model" value="one" :data-is-checked="model === 'one'" name="${defaultProps.name}" />
                        <radio-input v-model="model" value="two" :data-is-checked="model === 'two'" name="${defaultProps.name}" />
                        <radio-input v-model="model" value="three" :data-is-checked="model === 'three'" name="${defaultProps.name}" />
                    `,
                        data: () => ({ model: testModel })
                    }),
                    { attachTo: document.body }
                );

                expect(testModel.value).toBeUndefined();

                const inputs = wrapper.findAll('input');
                expect(inputs.length).toBe(3);

                let currentInput = inputs[2];

                testModel.value = 'three';
                await wrapper.vm.$nextTick();
                expect(currentInput.element.dataset.isChecked).toBe('true');

                currentInput = inputs[1];

                testModel.value = 'two';
                await wrapper.vm.$nextTick();
                expect(currentInput.element.dataset.isChecked).toBe('true');

                currentInput = inputs[0];

                testModel.value = 'one';
                await wrapper.vm.$nextTick();
                expect(currentInput.element.dataset.isChecked).toBe('true');
            });

            it('should switch value using function', async () => {
                const testModel = ref<string>();

                const wrapper = mount(
                    defineComponent({
                        components: { RadioInput },
                        template: `
                        <radio-input ref="elementOne" v-model="model" value="one" :data-is-checked="model === 'one'" name="${defaultProps.name}" />
                        <radio-input ref="elementTwo" v-model="model" value="two" :data-is-checked="model === 'two'" name="${defaultProps.name}" />
                        <radio-input ref="elementThree" v-model="model" value="three" :data-is-checked="model === 'three'" name="${defaultProps.name}" />
                    `,
                        data: () => ({ model: testModel })
                    }),
                    { attachTo: document.body }
                );

                expect(testModel.value).toBeUndefined();

                const inputs = wrapper.findAll('input');
                expect(inputs.length).toBe(3);

                await wrapper.findComponent({ ref: 'elementThree' }).vm.check();
                expect(testModel.value).toBe('three');
                expect(inputs[2].element.dataset.isChecked).toBe('true');

                await wrapper.findComponent({ ref: 'elementTwo' }).vm.check();
                expect(testModel.value).toBe('two');
                expect(inputs[1].element.dataset.isChecked).toBe('true');

                await wrapper.findComponent({ ref: 'elementOne' }).vm.check();
                expect(testModel.value).toBe('one');
                expect(inputs[0].element.dataset.isChecked).toBe('true');
            });
        });
    });

    describe('Unchecking', () => {
        it('should not uncheck using click', async () => {
            const { input, testModel } = mountRadioInput({ modelValue: 'test' });
            expect(testModel.value).toBe('test');

            await input.trigger('click');
            expect(testModel.value).toBe('test');
        });

        it('should uncheck using model value', async () => {
            const { wrapper, testModel } = mountRadioInput({ modelValue: 'test' });
            expect(testModel.value).toBe('test');

            await wrapper.setValue(undefined);
            expect(testModel.value).toBeUndefined();
        });

        it('should uncheck using function', async () => {
            const { wrapper, testModel } = mountRadioInput({ modelValue: 'test' });
            expect(testModel.value).toBe('test');

            await wrapper.vm.uncheck();
            expect(testModel.value).toBeUndefined();
        });
    });
});

describe('Validating model value', () => {
    it('should validate the string model value', async () => {
        const { wrapper } = mountRadioInput({ modelValue: 'test', validators: 'required' });

        const validation = wrapper.vm.validate();
        expect(validation).toEqual({ valid: true, failed: [] });
    });

    it('should validate the object model value', async () => {
        const { wrapper } = mountRadioInput({ modelValue: { foo: 'test', bar: true }, validators: 'required' });

        const validation = wrapper.vm.validate();
        expect(validation).toEqual({ valid: true, failed: [] });
    });

    it('should invalidate the model value', async () => {
        const { wrapper } = mountRadioInput({ modelValue: null, validators: 'required' });

        let validation = wrapper.vm.validate();
        expect(validation).toEqual({ valid: false, failed: [] });

        await wrapper.setValue(undefined);
        validation = wrapper.vm.validate();
        expect(validation).toEqual({ valid: false, failed: [] });
    });
});

function mountRadioInput(customProps: Record<string, unknown> = {}) {
    const testModel = ref<string | unknown>(customProps.modelValue ?? undefined);

    const result = mountComponent<typeof RadioInput>(RadioInput, 'input', {
        ...defaultProps,
        ...customProps,
        modelValue: testModel.value,
        'onUpdate:modelValue': (value: string | Record<string, unknown> | undefined) => (testModel.value = value)
    });

    return {
        wrapper: result.wrapper,
        input: result.input as DOMWrapper<HTMLInputElement>,
        testModel
    };
}
