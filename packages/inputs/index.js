"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextualInput = exports.TextualArea = exports.NumericInput = exports.CheckableInput = void 0;
/**
 * Base components
 */
var checkable_input_vue_1 = require("./src/components/checkable-input.vue");
exports.CheckableInput = checkable_input_vue_1.default;
var numeric_input_vue_1 = require("./src/components/numeric-input.vue");
exports.NumericInput = numeric_input_vue_1.default;
var textual_area_vue_1 = require("./src/components/textual-area.vue");
exports.TextualArea = textual_area_vue_1.default;
var textual_input_vue_1 = require("./src/components/textual-input.vue");
exports.TextualInput = textual_input_vue_1.default;
/**
 * Plugin
 */
exports.default = {
    install: function (app) {
        app.component('CheckableInput', checkable_input_vue_1.default);
        app.component('NumericInput', numeric_input_vue_1.default);
        app.component('TextInput', textual_input_vue_1.default);
        app.component('TextualArea', textual_area_vue_1.default);
    }
};
