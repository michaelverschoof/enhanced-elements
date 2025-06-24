import { readonly, ref } from 'vue';

type FocusableEmits = ((name: 'focus', event: FocusEvent) => void) & ((name: 'blur', event: FocusEvent) => void);

export const useFocusable = (emit: FocusableEmits) => {
    const focused = ref<boolean>();

    /**
     * Trigger the "focused" class and emit the focus event when focused.
     *
     * @param event The native focus event.
     */
    function onFocus(event: FocusEvent): void {
        focused.value = true;
        emit('focus', event);
    }

    /**
     * Remove the "focused" class and emit the blur event when blurred.
     *
     * @param event The native focus event.
     */
    function onBlur(event: FocusEvent): void {
        focused.value = false;
        emit('blur', event);
    }

    return {
        focused: readonly(focused),
        onFocus,
        onBlur
    };
};
