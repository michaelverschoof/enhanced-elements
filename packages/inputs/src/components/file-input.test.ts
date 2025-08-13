import FileInput from '@/components/file-input.vue';
import { testFocus, testRefocus } from '@test/focus';
import { mountComponent } from '@test/util/mount';
import { DOMWrapper, mount } from '@vue/test-utils';
import { File } from 'happy-dom';
import { beforeAll, describe, expect, it } from 'vitest';
import { ref } from 'vue';

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
// Call the focus/blur test-suite
testFocus(FileInput, 'input', { ...defaultProps });
testRefocus(FileInput, 'input', { ...defaultProps });

describe('Selecting files', () => {
    it('should select a file setting files directly', async () => {
        const { wrapper, input } = mountFileInput();

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
        const { wrapper } = mountFileInput();

        await wrapper.vm.select();

        // FIXME: Check if file select opened
        // expect(wrapper.emitted('files')).toHaveLength(1);
        // expect(wrapper.emitted('files')).toEqual([[[fileMock]]]);
    });

    it('should clear selected file using function', async () => {
        const { wrapper, input } = mountFileInput();

        // Directly inject the file in the input
        Object.defineProperty(input.element, 'files', {
            value: [fileMock],
            writable: false
        });

        await input.trigger('change');
        expect(input.element.files).toEqual([fileMock]);

        expect(wrapper.emitted('files')).toHaveLength(1);
        expect(wrapper.emitted('files')).toEqual([[[fileMock]]]);

        await wrapper.vm.clear();
        expect(wrapper.emitted('files')).toHaveLength(2);

        // FIXME: Files are not updated
        // expect(wrapper.emitted('files')![0]).toEqual([[[]]]);
    });
});

function mountFileInput(customProps: Record<string, unknown> = {}) {
    const testModel = ref<string>('');

    const { wrapper, input } = mountComponent<typeof FileInput>(FileInput, 'input', {
        ...defaultProps,
        ...customProps,
        'onUpdate:modelValue': (value: string) => (testModel.value = value)
    });

    return {
        wrapper,
        input: input as DOMWrapper<HTMLInputElement & { files: FileList }>,
        testModel
    };
}
