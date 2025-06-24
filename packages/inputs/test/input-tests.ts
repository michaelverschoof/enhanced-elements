import { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { emittedNativeEvents } from './emits';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export async function testFocusNative(wrapper: VueWrapper, input: DOMWrapper<InputElement>): Promise<void> {
    await isNotFocused(wrapper, input);

    input.element.focus();

    await isFocused(wrapper, input);
    emittedFocusEvent(wrapper);
}

export async function testFocusFunction(wrapper: VueWrapper, input: DOMWrapper<InputElement>): Promise<void> {
    await isNotFocused(wrapper, input);

    const component = wrapper.findComponent({ ref: 'element' }).vm;
    component.focus();

    await isFocused(wrapper, input);
    emittedFocusEvent(wrapper);
}

export async function testBlurNative(wrapper: VueWrapper, input: DOMWrapper<InputElement>): Promise<void> {
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

export async function testBlurFunction(wrapper: VueWrapper, input: DOMWrapper<InputElement>): Promise<void> {
    vi.useFakeTimers();

    await isNotFocused(wrapper, input);

    const component = wrapper.findComponent({ ref: 'element' }).vm;
    component.focus();
    await isFocused(wrapper, input);
    emittedFocusEvent(wrapper);

    component.blur();

    // Timers are needed as onBlur() in the component uses debounce
    vi.runAllTimers();

    await isNotFocused(wrapper, input);
    emittedBlurEvent(wrapper);

    vi.useRealTimers();
}

export async function testRefocus(wrapper: VueWrapper, input: DOMWrapper<InputElement>): Promise<void> {
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

async function isFocused(wrapper: VueWrapper, input: DOMWrapper<InputElement>): Promise<void> {
    expect(input.element).toBe(document.activeElement);

    await wrapper.vm.$nextTick();
    expect(input.classes()).toContain('focused');
}

async function isNotFocused(wrapper: VueWrapper, input: DOMWrapper<InputElement>): Promise<void> {
    expect(input.element).not.toBe(document.activeElement);

    await wrapper.vm.$nextTick();
    expect(input.classes()).not.toContain('focused');
}

function emittedFocusEvent(wrapper: VueWrapper): void {
    const emitted = emittedNativeEvents<FocusEvent>(wrapper, 'focus', 1);
    expect(emitted![0].type).toEqual('focus');
}

function emittedBlurEvent(wrapper: VueWrapper): void {
    const emitted = emittedNativeEvents<FocusEvent>(wrapper, 'blur', 1);
    expect(emitted![0].type).toEqual('blur');
}
