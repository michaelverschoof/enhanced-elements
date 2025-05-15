import { App } from 'vue';

/**
 * Base components
 */
import CheckableInput from './src/components/checkable-input.vue';
import NumericInput from './src/components/numeric-input.vue';
import TextualArea from './src/components/textual-area.vue';
import TextualInput from './src/components/textual-input.vue';

export type {
    FocusableEmits,
    TransformableInputProps,
    ValidatableEmits,
    ValidatableInputProps,
    ValidationResult
} from './src/components/types';

/**
 * Component exports
 */
export { CheckableInput, NumericInput, TextualArea, TextualInput };

/**
 * Plugin
 */
export default {
    install: (app: App) => {
        app.component('CheckableInput', CheckableInput);
        app.component('NumericInput', NumericInput);
        app.component('TextualInput', TextualInput);
        app.component('TextualArea', TextualArea);
    }
};
