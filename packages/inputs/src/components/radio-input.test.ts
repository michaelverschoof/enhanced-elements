import RadioInput from '@/components/radio-input.vue';
import { testBlurFunction, testBlurNative, testFocusFunction, testFocusNative } from '@test/input-tests';
import { mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';

const defaultProps = {
    name: 'testing-radio-input'
};

beforeAll(() => {
    expect(RadioInput).toBeTruthy();
});

afterEach(() => vi.clearAllMocks());

describe('Mounting components', () => {
    it('should mount the radio component', async () => {
        const { wrapper, input } = mountComponent();
        expect(input.element.type).toBe('radio');
        expect(wrapper.props('modelValue')).toBe(undefined);
    });

    describe('Mounting with checked initial values', async () => {
        it('should mount with a checked string value', async () => {
            const { wrapper } = mountComponent('test');
            expect(wrapper.props('modelValue')).toBe('test');
        });

        it('should mount with a checked object value', async () => {
            const wrapper = mount(RadioInput, {
                props: {
                    ...defaultProps,
                    value: { foo: 'test' },
                    modelValue: { foo: 'test' },
                    'onUpdate:modelValue': (event) => wrapper.setProps({ modelValue: event })
                }
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(wrapper.props('modelValue')).toEqual({ foo: 'test' });
        });
    });
});

describe('Focusing/blurring components', () => {
    describe('On focus', () => {
        it('should focus natively', async () => {
            const { wrapper, input } = mountComponent();
            await testFocusNative(wrapper, input);
        });

        it('should focus using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            await testFocusFunction(wrapper, input);
        });
    });

    describe('On blur', () => {
        it('should blur natively', async () => {
            const { wrapper, input } = mountComponent();
            await testBlurNative(wrapper, input);
        });

        it('should blur using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            await testBlurFunction(wrapper, input);
        });
    });
});

describe('Checking/unchecking components', () => {
    describe('Checking', () => {
        describe('Single item', () => {
            it('should check using click', async () => {
                const { wrapper, input } = mountComponent();
                expect(wrapper.props('modelValue')).toBe(undefined);

                await input.trigger('click');
                await input.trigger('change');
                expect(wrapper.props('modelValue')).toBe('test');
            });

            it('should check using model value', async () => {
                const { wrapper } = mountComponent();
                expect(wrapper.props('modelValue')).toBe(undefined);

                await wrapper.setProps({ modelValue: 'test' });
                expect(wrapper.props('modelValue')).toBe('test');
            });

            it('should check using function', async () => {
                const { testComponent, testModel } = mountCallableComponent();
                expect(testModel.value).toBeUndefined();

                await testComponent.vm.check();
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
            const { wrapper, input } = mountComponent('test');
            expect(wrapper.props('modelValue')).toBe('test');

            await input.trigger('click');
            await input.trigger('change');
            expect(wrapper.props('modelValue')).toBe('test');
        });

        it('should uncheck using model value', async () => {
            const { wrapper } = mountComponent('test');
            expect(wrapper.props('modelValue')).toBe('test');

            await wrapper.setProps({ modelValue: undefined });
            expect(wrapper.props('modelValue')).toBe(undefined);
        });

        it('should uncheck using function', async () => {
            const { testComponent, testModel } = mountCallableComponent('test');
            expect(testModel.value).toBe('test');

            await testComponent.vm.uncheck();
            expect(testModel.value).toBeUndefined();
        });
    });
});

function mountComponent(modelValue?: string) {
    const wrapper = mount(RadioInput, {
        props: {
            ...defaultProps,
            value: 'test',
            modelValue: modelValue,
            'onUpdate:modelValue': (event) => wrapper.setProps({ modelValue: event })
        },
        attachTo: document.body
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();

    return { wrapper, input };
}

function mountCallableComponent(modelValue?: string) {
    const testModel = ref<string | undefined>(modelValue);

    const wrapper = mount(
        defineComponent({
            components: { RadioInput },
            template: `<radio-input ref="element" v-model="model" value="test" name="${defaultProps.name}" />`,
            data: () => ({ model: testModel })
        }),
        { attachTo: document.body }
    );

    const testComponent = wrapper.findComponent({ ref: 'element' });

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();

    return { wrapper, input, testComponent, testModel };
}
