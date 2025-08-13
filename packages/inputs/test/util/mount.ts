import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { expect } from 'vitest';
import type { Component } from 'vue';

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export function mountComponent<T>(
    component: Component,
    selector: string,
    props: Record<string, unknown> = {}
): { wrapper: VueWrapper<T>; input: DOMWrapper<InputElement> } {
    const wrapper = mount(component, {
        props: props,
        attachTo: document.body
    });

    // Get the input
    const input = wrapper.find<InputElement>(selector);
    expect(input.exists()).toBeTruthy();

    return { wrapper, input };
}
