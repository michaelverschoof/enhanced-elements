import TextArea from '@/components/text-area.vue';
import * as ModelFunctions from '@/util/model';
import { testFocus, testRefocus } from '@test/focus';
import { mountComponent } from '@test/util/mount';
import { testRequiredValidation } from '@test/validate';
import { mount } from '@vue/test-utils';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

const defaultProps = {
    name: 'testing-text-area',
    modelValue: 'initial'
};

beforeAll(() => {
    expect(TextArea).toBeTruthy();
});

const createFiltersSpy = vi.spyOn(ModelFunctions, 'createFilters');
const createModifiersSpy = vi.spyOn(ModelFunctions, 'createModifiers');
const transformSpy = vi.spyOn(ModelFunctions, 'transform');

afterEach(() => vi.clearAllMocks());

describe('Mounting components', () => {
    it('should mount the textarea component', async () => {
        const wrapper = mount(TextArea, { props: defaultProps });
        expect(wrapper.find('textarea').exists()).toBeTruthy();
    });

    it('should mount with a filtered initial value', async () => {
        const { testModel } = mountTextArea({ filters: /[^i]/g });
        expect(testModel.value).toBe('ntal');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(transformSpy).toHaveBeenCalledOnce();
    });
});

// Call the focus/blur test-suite
testFocus(TextArea, 'textarea', { ...defaultProps });
testRefocus(TextArea, 'textarea', { ...defaultProps });

describe('Updating model value', () => {
    it('should update the model value', async () => {
        const { input, testModel } = mountTextArea();

        await input.setValue('updated value');
        expect(testModel.value).toBe('updated value');

        expect(createFiltersSpy).toHaveBeenCalledOnce();
        expect(createFiltersSpy).toHaveBeenCalledWith([]);
        expect(createModifiersSpy).toHaveBeenCalledOnce();
        expect(createModifiersSpy).toHaveBeenCalledWith([]);
        expect(transformSpy).toHaveBeenCalledOnce();
    });

    describe('Using filters', () => {
        it('should filter the value using presets', async () => {
            const { wrapper, input, testModel } = mountTextArea();

            // Filter out letters
            await wrapper.setProps({ filters: 'letters' });
            await input.setValue('updated 12345');
            expect(testModel.value).toBe(' 12345');

            // Filter out numbers
            await wrapper.setProps({ filters: 'numbers' });
            await input.setValue('updated 12345');
            expect(testModel.value).toBe('updated ');

            // Filter out numbers and then letters
            await wrapper.setProps({ filters: ['numbers', 'letters'] });
            await input.setValue('$updated-12345_');
            expect(testModel.value).toBe('$-_');

            // Once for the inital value and thrice for the updates to the filters
            expect(createFiltersSpy).toHaveBeenCalledTimes(4);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should filter the value using regexes', async () => {
            const { wrapper, input, testModel } = mountTextArea();

            // Filter letters only
            await wrapper.setProps({ filters: /[^A-Z]/g });
            await input.setValue('UPDATED with 12345');
            expect(testModel.value).toBe(' with 12345');

            // Filter numbers only
            await wrapper.setProps({ filters: /[^0-9]/g });
            await input.setValue('UPDATED with 12345');
            expect(testModel.value).toBe('UPDATED with ');

            // Filter out numbers and then uppercase letters
            await wrapper.setProps({ filters: [/[^0-9]/g, /[^A-Z]/g] });
            await input.setValue('UPDATED with 12345');
            expect(testModel.value).toBe(' with ');

            expect(createFiltersSpy).toHaveBeenCalledTimes(4);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should filter the value using functions', async () => {
            const { wrapper, input, testModel } = mountTextArea();

            // Filter spaces
            await wrapper.setProps({
                filters: (value: string) => (value.match(/[^ ]/g) || []).join('')
            });
            await input.setValue('UPDATED with 12345');
            expect(testModel.value).toBe('UPDATEDwith12345');

            // Filter dashes
            await wrapper.setProps({
                filters: (value: string) => (value.match(/[^-]/g) || []).join('')
            });
            await input.setValue('UPDATED-with-12345');
            expect(testModel.value).toBe('UPDATEDwith12345');

            // Filter out numbers and then uppercase letters
            await wrapper.setProps({
                filters: [
                    (value: string) => (value.match(/[^ ]/g) || []).join(''),
                    (value: string) => (value.match(/[^-]/g) || []).join('')
                ]
            });
            await input.setValue('UPDATED-with 12345');
            expect(testModel.value).toBe('UPDATEDwith12345');

            expect(createFiltersSpy).toHaveBeenCalledTimes(4);
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Using modifiers', () => {
        it('should modify the value using presets', async () => {
            const { wrapper, input, testModel } = mountTextArea();

            // Convert to lowercase
            await wrapper.setProps({ modifiers: 'lowercase' });
            await input.setValue('UPDATED 12345');
            expect(testModel.value).toBe('updated 12345');

            // Convert to uppercase
            await wrapper.setProps({ modifiers: 'uppercase' });
            await input.setValue('updated 12345');
            expect(testModel.value).toBe('UPDATED 12345');

            // Convert to lowercase and then uppercase
            await wrapper.setProps({ modifiers: ['lowercase', 'uppercase'] });
            await input.setValue('updated 12345');
            expect(testModel.value).toBe('UPDATED 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledTimes(4);
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });

        it('should modify the value using functions', async () => {
            const { wrapper, input, testModel } = mountTextArea();

            // Get the first 7 characters
            await wrapper.setProps({ modifiers: (value: string) => value.substring(0, 7) });
            await input.setValue('updated 12345');
            expect(testModel.value).toBe('updated');

            // Get the last 5 characters
            await wrapper.setProps({ modifiers: (value: string) => value.slice(-5) });
            await input.setValue('updated 12345');
            expect(testModel.value).toBe('12345');

            // Remove the first 3 and then the last 3 characters
            await wrapper.setProps({
                modifiers: [
                    (value: string) => value.substring(3),
                    (value: string) => value.substring(0, value.length - 3)
                ]
            });
            await input.setValue('updated 12345');
            expect(testModel.value).toBe('ated 12');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledTimes(4);
            expect(transformSpy).toHaveBeenCalledTimes(3);
        });
    });

    describe('Using model modifiers', () => {
        it('should uppercase the value', async () => {
            const { input, testModel } = mountTextArea({
                modelModifiers: { uppercase: true }
            });

            // Convert to uppercase
            await input.setValue('updated 12345');
            expect(testModel.value).toBe('UPDATED 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });

        it('should lowercase the value', async () => {
            const { input, testModel } = mountTextArea({
                modelModifiers: { lowercase: true }
            });

            // Convert to lowercase
            await input.setValue('UPDATED 12345');
            expect(testModel.value).toBe('updated 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });

        it('should lowercase then uppercase the value', async () => {
            const { input, testModel } = mountTextArea({
                modelModifiers: { lowercase: true, uppercase: true }
            });

            // Convert to lowercase and then to uppercase
            await input.setValue('UPDATED 12345');
            expect(testModel.value).toBe('UPDATED 12345');

            expect(createFiltersSpy).toHaveBeenCalledOnce();
            expect(createModifiersSpy).toHaveBeenCalledOnce();
            expect(transformSpy).toHaveBeenCalledTimes(2);
        });
    });
});

describe('Validating model value', () => {
    // Call the 'required' validation test-suite
    testRequiredValidation(TextArea, 'textarea');
});

function mountTextArea(customProps: Record<string, unknown> = {}) {
    const testModel = ref<string>('');

    const result = mountComponent<typeof TextArea>(TextArea, 'textarea', {
        ...defaultProps,
        ...customProps,
        'onUpdate:modelValue': (value: string) => (testModel.value = value)
    });

    return { ...result, testModel };
}
