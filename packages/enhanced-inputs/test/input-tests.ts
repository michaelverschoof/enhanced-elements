import { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { emittedNativeEvents } from './emits';

type TextElement = HTMLInputElement | HTMLTextAreaElement;

export function testFocusNative(wrapper: VueWrapper, input: DOMWrapper<TextElement>): void {
    isNotFocused(input);

    input.element.focus();

    isFocused(input);
    emittedFocusEvent(wrapper);
}

export function testFocusFunction(wrapper: VueWrapper, input: DOMWrapper<TextElement>): void {
    isNotFocused(input);

    const component = wrapper.findComponent({ ref: 'element' }).vm;
    component.focus();

    isFocused(input);
    emittedFocusEvent(wrapper);
}

export function testBlurNative(wrapper: VueWrapper, input: DOMWrapper<TextElement>): void {
    vi.useFakeTimers();

    isNotFocused(input);

    input.element.focus();

    isFocused(input);
    emittedFocusEvent(wrapper);

    input.element.blur();
    isNotFocused(input);

    // Timers are needed as onBlur() in the component uses debounce
    vi.runAllTimers();

    emittedBlurEvent(wrapper);

    vi.useRealTimers();
}

export function testBlurFunction(wrapper: VueWrapper, input: DOMWrapper<TextElement>): void {
    isNotFocused(input);

    const component = wrapper.findComponent({ ref: 'element' }).vm;
    component.focus();
    isFocused(input);
    emittedFocusEvent(wrapper);

    component.blur();
    isNotFocused(input);
    emittedBlurEvent(wrapper);
}

export function testRefocus(wrapper: VueWrapper, input: DOMWrapper<TextElement>): void {
    vi.useFakeTimers();

    isNotFocused(input);

    input.element.focus();
    isFocused(input);

    // Timers are needed as onFocus() in the component uses debounce
    vi.runAllTimers();

    emittedFocusEvent(wrapper);

    // Blur the element
    input.element.blur();
    isNotFocused(input);

    // Advance time to before the blur emit would happen
    vi.advanceTimersByTime(50);
    isNotFocused(input);
    emittedNativeEvents<FocusEvent>(wrapper, 'blur', 0);

    // Re-focus before the blur emit
    input.element.focus();
    isFocused(input);
    emittedNativeEvents<FocusEvent>(wrapper, 'blur', 0);

    // Timers are needed as onBlur() in the component uses debounce
    vi.runAllTimers();

    emittedNativeEvents<FocusEvent>(wrapper, 'blur', 0);
    emittedNativeEvents<FocusEvent>(wrapper, 'focus', 2);

    vi.useRealTimers();
}

function isFocused(input: DOMWrapper<TextElement>): void {
    expect(input.element).toBe(document.activeElement);
}

function isNotFocused(input: DOMWrapper<TextElement>): void {
    expect(input.element).not.toBe(document.activeElement);
}

function emittedFocusEvent(wrapper: VueWrapper): void {
    const emitted = emittedNativeEvents<FocusEvent>(wrapper, 'focus', 1);
    expect(emitted![0].type).toEqual('focus');
}

function emittedBlurEvent(wrapper: VueWrapper): void {
    const emitted = emittedNativeEvents<FocusEvent>(wrapper, 'blur', 1);
    expect(emitted![0].type).toEqual('blur');
}
