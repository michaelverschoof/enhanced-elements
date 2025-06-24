import PasswordInput from '@/components/password-input.vue';
import { testBlurFunction, testBlurNative, testFocusFunction, testFocusNative, testRefocus } from '@test/input-tests';
import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';
import { defineComponent, ref } from 'vue';

const defaultProps = {
    name: 'testing-textual-input'
};

beforeAll(() => {
    expect(PasswordInput).toBeTruthy();
});

describe('Mounting components', () => {
    it('should mount the input component', async () => {
        const wrapper = mount(PasswordInput, { props: defaultProps });
        expect(wrapper.find('input').exists()).toBeTruthy();
    });
});

describe('Focusing/blurring components', () => {
    describe('On focus', () => {
        it('should focus natively', async () => {
            const { wrapper, input } = mountComponent({ attachTo: document.body });
            testFocusNative(wrapper, input);
        });

        it('should focus using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            testFocusFunction(wrapper, input);
        });
    });

    describe('On blur', () => {
        it('should blur natively', async () => {
            const { wrapper, input } = mountComponent({ attachTo: document.body });
            testBlurNative(wrapper, input);
        });

        it('should blur using function', async () => {
            const { wrapper, input } = mountCallableComponent();
            testBlurFunction(wrapper, input);
        });

        it('should keep focus when focusing quickly after blurring', async () => {
            const { wrapper, input } = mountComponent({ attachTo: document.body });
            testRefocus(wrapper, input);
        });
    });
});

describe('Showing/hiding password', () => {
    it('should show and hide using property', async () => {
        const { wrapper, input } = mountComponent();
        expect(input.element.type).toBe('password');

        await wrapper.setProps({ showPassword: true });
        expect(input.element.type).toBe('text');

        await wrapper.setProps({ showPassword: false });
        expect(input.element.type).toBe('password');
    });

    it('should show and hide using function', async () => {
        const { wrapper, input } = mountCallableComponent();
        expect(input.element.type).toBe('password');

        const component = wrapper.findComponent({ ref: 'element' }).vm;

        await component.showPassword();
        expect(input.element.type).toBe('text');

        await component.hidePassword();
        expect(input.element.type).toBe('password');
    });
});

function mountComponent(args?: Record<string, unknown>) {
    const testModelValue = ref<string>('');

    const wrapper = mount(PasswordInput, {
        props: {
            ...defaultProps,
            showPassword: false,
            modelValue: 'initial',
            'onUpdate:modelValue': (value: string) => (testModelValue.value = value as string)
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
            components: { PasswordInput },
            template: `<password-input ref="element" name="${defaultProps.name}" />`
        }),
        { attachTo: document.body }
    );

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();

    return { wrapper, input };
}
