import { App } from 'vue';

/**
 * Base components
 */
import CheckableInput from './components/checkable-input.vue';
import NumericInput from './components/numeric-input.vue';
import RadioInput from './components/radio-input.vue';
import TextualArea from './components/textual-area.vue';
import TextualInput from './components/textual-input.vue';

export type {
    FocusableEmits,
    TransformableInputProps,
    ValidatableEmits,
    ValidatableInputProps,
    ValidationResult
} from './components/types';

/**
 * Component exports
 */
export { CheckableInput, NumericInput, RadioInput, TextualArea, TextualInput };

/**
 * Plugin
 */
export default {
    install: (app: App) => {
        app.component('CheckableInput', CheckableInput);
        app.component('NumericInput', NumericInput);
        app.component('TextualInput', TextualInput);
        app.component('TextualArea', TextualArea);
        app.component('RadioInput', RadioInput);
    }
};
