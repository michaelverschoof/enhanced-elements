import FileInput from '@/components/file-input.vue';
import { testBlurFunction, testBlurNative, testFocusFunction, testFocusNative, testRefocus } from '@test/input-tests';
import { mount } from '@vue/test-utils';
import { File } from 'happy-dom';
import { beforeAll, describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';

const defaultProps = {
    name: 'testing-textual-input'
};

const fileMock = new File(['(file content)'], 'test-file.txt', {
    type: 'text/plain'
});

beforeAll(() => {
    expect(FileInput).toBeTruthy();
});

describe('Mounting components', () => {
    it('should mount the input component', async () => {
        const wrapper = mount(FileInput, { props: defaultProps });

        const input = wrapper.find('input');
        expect(input.exists()).toBeTruthy();
        expect(input.element.type).toBe('file');
    });
});

// TODO: Add focus test for the file button
describe('Focusing/blurring components', () => {
    describe('On focus', () => {
        it('should focus natively', async () => {
            const { wrapper, input } = mountComponent({ attachTo: document.body });
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

        it('should keep focus when focusing quickly after blurring', async () => {
            const { wrapper, input } = mountComponent();
            await testRefocus(wrapper, input);
        });
    });
});

describe('Selecting files', () => {
    it('should select a file setting files directly', async () => {
        const { wrapper, input } = mountComponent();

        // Directly inject the file in the input
        Object.defineProperty(input.element, 'files', {
            value: [fileMock],
            writable: false
        });

        await input.trigger('change');
        expect(input.element.files).toEqual([fileMock]);
        expect(wrapper.emitted('files')).toEqual([[[fileMock]]]);
    });

    it('should trigger file select using function', async () => {
        const { component } = mountComponent();

        await component.vm.select();

        // FIXME: Check if file select opened
        // expect(wrapper.emitted('files')).toHaveLength(1);
        // expect(wrapper.emitted('files')).toEqual([[[fileMock]]]);
    });

    it('should clear selected file using function', async () => {
        const { wrapper, component, input } = mountComponent();

        // Directly inject the file in the input
        Object.defineProperty(input.element, 'files', {
            value: [fileMock],
            writable: false
        });

        await input.trigger('change');
        expect(input.element.files).toEqual([fileMock]);

        expect(wrapper.emitted('files')).toHaveLength(1);
        expect(wrapper.emitted('files')).toEqual([[[fileMock]]]);

        await component.vm.clear();
        expect(component.emitted('files')).toHaveLength(2);

        // FIXME: Files are not updated
        // expect(component.emitted('files')![0]).toEqual([[[]]]);
    });
});

function mountComponent(args?: Record<string, unknown>) {
    const wrapper = mount(FileInput, {
        props: defaultProps,
        attachTo: document.body,
        ...args
    });

    const component = wrapper.findComponent({ name: 'FileInput' });

    // Get the input
    const input = wrapper.find('input');

    // Perform base tests
    expect(input.exists()).toBeTruthy();

    return { wrapper, component, input };
}

function mountCallableComponent() {
    const wrapper = mount(
        defineComponent({
            components: { FileInput },
            template: `<file-input ref="element" name="${defaultProps.name}" />`
        }),
        { attachTo: document.body }
    );

    const input = wrapper.find('input');
    expect(input.exists()).toBeTruthy();

    return { wrapper, input };
}
