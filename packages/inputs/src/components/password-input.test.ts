import PasswordInput from '@/components/password-input.vue';
import { testFocus, testRefocus } from '@test/focus';
import { mountComponent } from '@test/util/mount';
import { testRequiredValidation } from '@test/validate';
import { mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';
import { ref } from 'vue';

const defaultProps = {
    name: 'testing-text-input'
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

// Call the focus/blur test-suite
testFocus(PasswordInput, 'input', { ...defaultProps });
testRefocus(PasswordInput, 'input', { ...defaultProps });

describe('Showing/hiding password', () => {
    it('should show and hide using property', async () => {
        const { wrapper, input } = mountPasswordInput();
        expect(input.element.type).toBe('password');

        await wrapper.setProps({ showPassword: true });
        expect(input.element.type).toBe('text');

        await wrapper.setProps({ showPassword: false });
        expect(input.element.type).toBe('password');
    });

    it('should show and hide using function', async () => {
        const { wrapper, input } = mountPasswordInput();
        expect(input.element.type).toBe('password');

        await wrapper.vm.showPassword();
        expect(input.element.type).toBe('text');

        await wrapper.vm.hidePassword();
        expect(input.element.type).toBe('password');
    });
});

describe('Validating model value', () => {
    // Call the 'required' validation test-suite
    testRequiredValidation(PasswordInput, 'input');
});

function mountPasswordInput(customProps: Record<string, unknown> = {}) {
    const testModel = ref<string>('');

    const result = mountComponent<typeof PasswordInput>(PasswordInput, 'input', {
        ...defaultProps,
        ...customProps,
        'onUpdate:modelValue': (value: string) => (testModel.value = value)
    });

    return { ...result, testModel };
}
