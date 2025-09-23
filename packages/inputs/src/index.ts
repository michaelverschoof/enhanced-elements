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
 * Component exports
 */
export { CheckboxInput, FileInput, NumberInput, PasswordInput, RadioInput, TextArea, TextInput };

export type {
    FocusableEmits,
    TransformableInputProps,
    ValidatableInputProps,
    ValidationResult
} from './components/types';

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
