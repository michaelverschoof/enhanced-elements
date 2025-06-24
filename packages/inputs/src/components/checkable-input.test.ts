import CheckableInput from '@/components/checkable-input.vue';
import { testBlurFunction, testBlurNative, testFocusFunction, testFocusNative } from '@test/input-tests';
import { mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, test, vi } from 'vitest';
import { defineComponent } from 'vue';

const warnSpy = vi.spyOn(console, 'warn').mockImplementation(vi.fn());

const defaultProps = {
    name: 'testing-checkable-input'
};

beforeAll(() => {
    expect(CheckableInput).toBeTruthy();
});

afterEach(() => vi.clearAllMocks());

describe('Mounting components', () => {
    it('should mount the checkbox component', async () => {
        const wrapper = mount(CheckableInput, {
            props: defaultProps
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBeTruthy();
        expect(input.element.type).toBe('checkbox');
        expect(input.element.checked).toBe(false);
    });

    describe('Mounting with checked initial values', async () => {
        test('should mount with a checked boolean value', async () => {
            const wrapper = mount(CheckableInput, {
                props: { ...defaultProps, modelValue: true }
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(input.element.checked).toBe(true);
        });

        test('should mount with a checked array value', async () => {
            const wrapper = mount(CheckableInput, {
                props: { ...defaultProps, value: 'test', modelValue: ['test'] }
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(input.element.value).toBe('test');
            expect(input.element.checked).toBe(true);
        });

        test('should mount with a checked Set value', async () => {
            const wrapper = mount(CheckableInput, {
                props: { ...defaultProps, value: 'test', modelValue: new Set(['test']) }
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(input.element.value).toBe('test');
            expect(input.element.checked).toBe(true);
        });
    });
});

describe('Focusing/blurring components', () => {
    describe('On focus', () => {
        it('should focus natively', async () => {
            const wrapper = mount(CheckableInput, {
                props: defaultProps,
                attachTo: document.body
            });

            const input = wrapper.find('input');
            await testFocusNative(wrapper, input);
        });

        it('should focus using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            await testFocusFunction(wrapper, input);
        });
    });

    describe('On blur', () => {
        it('should blur natively', async () => {
            const wrapper = mount(CheckableInput, {
                props: defaultProps,
                attachTo: document.body
            });

            const input = wrapper.find('input');
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
        it('should check using click', async () => {
            const wrapper = mount(CheckableInput, {
                props: defaultProps
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(input.element.checked).toBe(false);

            await input.trigger('click');
            expect(input.element.checked).toBe(true);
        });

        describe('Checking using function', () => {
            it('should check boolean model value', async () => {
                const { wrapper, input } = mountCallableComponent();
                expect(input.element.checked).toBe(false);

                const component = wrapper.findComponent({ ref: 'element' }).vm;
                await component.check();
                expect(input.element.checked).toBe(true);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should check array model value', async () => {
                const { wrapper, input } = mountCallableComponent();
                await wrapper.setProps({
                    // @ts-expect-error prop is not in the literal values
                    value: 'test',
                    modelValue: [],
                    // @ts-expect-error prop is not in the literal values
                    'onUpdate:modelValue': (event: string) => wrapper.setProps({ modelValue: [event] })
                });
                expect(input.element.checked).toBe(false);

                const component = wrapper.findComponent({ ref: 'element' }).vm;
                await component.check();
                expect(input.element.checked).toBe(true);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should give a warning when the value is not set', async () => {
                const wrapper = mount(
                    defineComponent({
                        components: { CheckableInput },
                        template: `<checkable-input ref="element" v-model="test" name="${defaultProps.name}" />`
                    }),
                    { attachTo: document.body }
                );

                const input = wrapper.find('input');
                expect(input.exists()).toBeTruthy();
                expect(input.element.checked).toBe(false);

                const component = wrapper.findComponent({ ref: 'element' }).vm;
                await component.check();
                expect(input.element.checked).toBe(false);

                expect(warnSpy).toBeCalledWith('Could not tick checkbox-item.', 'There is no value to set.');
            });
        });

        it('should check using model value', async () => {
            const wrapper = mount(CheckableInput, {
                props: {
                    ...defaultProps,
                    modelValue: false,
                    'onUpdate:modelValue': (event) => wrapper.setProps({ modelValue: event })
                }
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(input.element.checked).toBe(false);

            await wrapper.setProps({ modelValue: true });
            expect(input.element.checked).toBe(true);
        });
    });

    describe('Unchecking', () => {
        it('should uncheck using click', async () => {
            const wrapper = mount(CheckableInput, {
                props: { ...defaultProps, modelValue: true }
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(input.element.checked).toBe(true);

            await input.trigger('click');
            expect(input.element.checked).toBe(false);
        });

        describe('Unchecking using function', () => {
            it('should uncheck using function', async () => {
                const { wrapper, input } = mountCallableComponent();
                expect(input.element.checked).toBe(false);

                const component = wrapper.findComponent({ ref: 'element' }).vm;
                await component.check();
                expect(input.element.checked).toBe(true);

                await component.uncheck();
                expect(input.element.checked).toBe(false);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should uncheck string array model value', async () => {
                const { wrapper, input } = mountCallableComponent();
                await wrapper.setProps({
                    // @ts-expect-error prop is not in the literal values
                    value: 'test',
                    modelValue: ['test'],
                    // @ts-expect-error prop is not in the literal values
                    'onUpdate:modelValue': () => wrapper.setProps({ modelValue: [] })
                });
                expect(input.element.checked).toBe(true);

                const component = wrapper.findComponent({ ref: 'element' }).vm;
                await component.uncheck();
                expect(input.element.checked).toBe(false);
                expect(warnSpy).not.toHaveBeenCalled();
            });

            it('should give a warning when the value is not set', async () => {
                const wrapper = mount(
                    defineComponent({
                        components: { CheckableInput },
                        template: `<checkable-input ref="element" v-model="test" name="${defaultProps.name}" />`
                    }),
                    { attachTo: document.body }
                );

                const input = wrapper.find('input');
                expect(input.exists()).toBeTruthy();
                expect(input.element.checked).toBe(false);

                await input.trigger('click');
                expect(input.element.checked).toBe(true);

                const component = wrapper.findComponent({ ref: 'element' }).vm;
                await component.uncheck();
                expect(input.element.checked).toBe(true);

                expect(warnSpy).toBeCalledWith('Could not untick checkbox-item.', 'There is no value to unset.');
            });
        });

        it('should uncheck using model value', async () => {
            const wrapper = mount(CheckableInput, {
                props: {
                    ...defaultProps,
                    modelValue: true,
                    'onUpdate:modelValue': (event) => wrapper.setProps({ modelValue: event })
                }
            });

            const input = wrapper.find('input');
            expect(input.exists()).toBeTruthy();
            expect(input.element.checked).toBe(true);

            await wrapper.setProps({ modelValue: false });
            expect(input.element.checked).toBe(false);
        });
    });
});

function mountCallableComponent() {
    const wrapper = mount(
        defineComponent({
            components: { CheckableInput },
            template: `<checkable-input ref="element" name="${defaultProps.name}" />`
        }),
        { attachTo: document.body }
    );

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();

    return { wrapper, input };
}
