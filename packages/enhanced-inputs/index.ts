import { App } from 'vue';

/**
 * Base components
 */
import CheckableInput from './src/components/checkable-input.vue';
import NumericInput from './src/components/numeric-input.vue';
import TextualInput from './src/components/textual-input.vue';

/**
 * Component exports
 */
export { CheckableInput, NumericInput, TextualInput };

/**
 * Plugin
 */
export default {
    install: (app: App) => {
        app.component('CheckableInput', CheckableInput);
        app.component('NumericInput', NumericInput);
        app.component('TextInput', TextualInput);
    }
};
