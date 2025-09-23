import { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Component, DefineComponent } from 'vue';
import { emittedNativeEvents } from './util/emits';
import { InputElement, mountComponent } from './util/mount';

type FocusableComponent = DefineComponent<{
    focus: () => void | undefined;
    blur: () => void | undefined;
}>;

type FocusableComponentWrapper = VueWrapper<FocusableComponent>;

type InputWrapper = DOMWrapper<InputElement>;

export function testFocus(component: Component, selector: string, props: Record<string, unknown> = {}) {
    return describe('Focusing/blurring components', () => {
        it('should focus natively', async () => {
            const { wrapper, input } = mountComponent(component, selector, props);
            await testFocusNative(wrapper as FocusableComponentWrapper, input);
        });

        it('should focus using function', async () => {
            const { wrapper, input } = mountComponent(component, selector, props);
            await testFocusFunction(wrapper as FocusableComponentWrapper, input);
        });

        it('should blur natively', async () => {
            const { wrapper, input } = mountComponent(component, selector, props);
            await testBlurNative(wrapper as FocusableComponentWrapper, input);
        });

        it('should blur using function', async () => {
            const { wrapper, input } = mountComponent(component, selector, props);
            await testBlurFunction(wrapper as FocusableComponentWrapper, input);
        });
    });
}

export function testRefocus(component: Component, selector: string, props: Record<string, unknown> = {}) {
    return describe('Focusing/blurring components', () => {
        it('should keep focus when focusing quickly after blurring', async () => {
            const { wrapper, input } = mountComponent(component, selector, props);
            await testRefocusFunction(wrapper as FocusableComponentWrapper, input);
        });
    });
}

async function testFocusNative(wrapper: FocusableComponentWrapper, input: InputWrapper): Promise<void> {
    await isNotFocused(wrapper, input);

    input.element.focus();

    await isFocused(wrapper, input);
    emittedFocusEvent(wrapper);
}

async function testFocusFunction(wrapper: FocusableComponentWrapper, input: InputWrapper): Promise<void> {
    await isNotFocused(wrapper, input);

    wrapper.vm.focus();

    await isFocused(wrapper, input);
    emittedFocusEvent(wrapper);
}

async function testBlurNative(wrapper: FocusableComponentWrapper, input: InputWrapper): Promise<void> {
    vi.useFakeTimers();

    await isNotFocused(wrapper, input);

    input.element.focus();

    await isFocused(wrapper, input);
    emittedFocusEvent(wrapper);

    input.element.blur();

    // Timers are needed as onBlur() in the component may use debounce
    vi.runAllTimers();

    await isNotFocused(wrapper, input);
    emittedBlurEvent(wrapper);

    vi.useRealTimers();
}

async function testBlurFunction(wrapper: FocusableComponentWrapper, input: InputWrapper): Promise<void> {
    vi.useFakeTimers();

    await isNotFocused(wrapper, input);

    wrapper.vm.focus();
    await isFocused(wrapper, input);
    emittedFocusEvent(wrapper);

    wrapper.vm.blur();

    // Timers are needed as onBlur() in the component uses debounce
    vi.runAllTimers();

    await isNotFocused(wrapper, input);
    emittedBlurEvent(wrapper);

    vi.useRealTimers();
}

async function testRefocusFunction(wrapper: FocusableComponentWrapper, input: InputWrapper): Promise<void> {
    vi.useFakeTimers();

    await isNotFocused(wrapper, input);

    input.element.focus();
    await isFocused(wrapper, input);

    // Timers are needed as onFocus() in the component uses debounce
    vi.runAllTimers();

    emittedFocusEvent(wrapper);

    // Blur the element
    input.element.blur();

    // Advance time to before the blur emit would happen
    vi.advanceTimersByTime(50);
    expect(input.element).not.toBe(document.activeElement);
    emittedNativeEvents<FocusEvent>(wrapper, 'blur', 0);

    // Re-focus before the blur emit
    input.element.focus();
    await isFocused(wrapper, input);
    emittedNativeEvents<FocusEvent>(wrapper, 'blur', 0);

    // Timers are needed as onBlur() in the component uses debounce
    vi.runAllTimers();

    emittedNativeEvents<FocusEvent>(wrapper, 'blur', 0);
    emittedNativeEvents<FocusEvent>(wrapper, 'focus', 2);

    vi.useRealTimers();
}

async function isFocused(wrapper: FocusableComponentWrapper, input: InputWrapper): Promise<void> {
    expect(input.element).toBe(document.activeElement);

    await wrapper.vm.$nextTick();
    expect(input.classes()).toContain('focused');
}

async function isNotFocused(wrapper: FocusableComponentWrapper, input: InputWrapper): Promise<void> {
    expect(input.element).not.toBe(document.activeElement);

    await wrapper.vm.$nextTick();
    expect(input.classes()).not.toContain('focused');
}

function emittedFocusEvent(wrapper: FocusableComponentWrapper): void {
    const emitted = emittedNativeEvents<FocusEvent>(wrapper, 'focus', 1);
    expect(emitted![0].type).toEqual('focus');
}

function emittedBlurEvent(wrapper: FocusableComponentWrapper): void {
    const emitted = emittedNativeEvents<FocusEvent>(wrapper, 'blur', 1);
    expect(emitted![0].type).toEqual('blur');
}
