import { App } from 'vue';

/**
 * Base components
 */
import CheckableInput from './components/checkable-input.vue';
import FileInput from './components/file-input.vue';
import NumericInput from './components/numeric-input.vue';
import PasswordInput from './components/password-input.vue';
import RadioInput from './components/radio-input.vue';
import TextualArea from './components/textual-area.vue';
import TextualInput from './components/textual-input.vue';

/**
 * Component exports
 */
export { CheckableInput, FileInput, NumericInput, PasswordInput, RadioInput, TextualArea, TextualInput };

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
        app.component('CheckableInput', CheckableInput);
        app.component('FileInput', FileInput);
        app.component('NumericInput', NumericInput);
        app.component('PasswordInput', PasswordInput);
        app.component('TextualInput', TextualInput);
        app.component('TextualArea', TextualArea);
        app.component('RadioInput', RadioInput);
    }
};
