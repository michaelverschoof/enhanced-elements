import { App } from 'vue';

/**
 * Base components
 */
import CheckboxInput from './components/checkbox-input.vue';
import FileInput from './components/file-input.vue';
import NumberInput from './components/number-input.vue';
import PasswordInput from './components/password-input.vue';
import RadioInput from './components/radio-input.vue';
import TextArea from './components/text-area.vue';
import TextInput from './components/text-input.vue';

/**
 * Component types
 */
import type { CheckboxModel } from './components/checkbox-input.vue';

/**
 * Component exports
 */
export { CheckboxInput, FileInput, NumberInput, PasswordInput, RadioInput, TextArea, TextInput };

/**
 * Component type exports
 */
export type { FocusableEmits, TransformableInputProps, ValidationResult } from './components/types';
export type { CheckboxModel };

/**
 * Plugin
 */
export default {
    install: (app: App) => {
        app.component('CheckboxInput', CheckboxInput);
        app.component('FileInput', FileInput);
        app.component('NumberInput', NumberInput);
        app.component('PasswordInput', PasswordInput);
        app.component('TextInput', TextInput);
        app.component('TextArea', TextArea);
        app.component('RadioInput', RadioInput);
    }
};
