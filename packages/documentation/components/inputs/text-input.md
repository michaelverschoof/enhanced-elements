# Text Input

## Basic usage

<!--@include: @/parts/examples/text-input/basic.md-->

## Model

You can use the `v-model` as you're used to in Vue. Check the [official documentation](https://vuejs.org/api/built-in-directives.html#v-model) for more information on how to use models.

You can add the existing [Vue model modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers) to the model. Besides that there are additional modifiers you can add:

### `uppercase`

The uppercase modifier changes the value (as you've guessed) to an uppercased variant.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';

const model = ref<string>('my special value');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "foo" as "FOO" -->
    <!-- [!code focus] -->
    <textual-input v-model.uppercase="model" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';

const model = ref('my special value');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "foo" as "FOO" -->
    <!-- [!code focus] -->
    <textual-input v-model.uppercase="model" />
</template>
```

:::

### `lowercase`

The uppercase modifier changes the value (shockingly) to an lowercased variant.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';

const model = ref<string>('FOO');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "FOO" as "foo" -->
    <!-- [!code focus] -->
    <textual-input v-model.lowercase="model" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';

const model = ref('FOO');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "FOO" as "foo" -->
    <!-- [!code focus] -->
    <textual-input v-model.lowercase="model" />
</template>
```

:::

## Props

The TextualInput element allows all default HTML properties and attributes. Apart from those the following properties are added:

### `validators`

Either a single or an array of multiple validators. These can be predefined presets or custom functions.

#### A single validator

A single validator can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <textual-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <textual-input :validators="(value: string) => value?.length > 5" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <textual-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <textual-input :validators="(value) => value?.length > 5" />
</template>
```

:::

#### Multiple validators

Multiple validators can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';

// [!code focus]
const validatorFunction = (value: string) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <textual-input :validators="['required', validatorFunction]" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';

// [!code focus]
const validatorFunction = (value) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <textual-input :validators="['required', validatorFunction]" />
</template>
```

:::

::: details Type definition

```ts
// One or more validation presets and/or custom functions
validators?: Validation | Validation[];

// Combination of presets and/or functions
type Validation = ValidationPreset | ValidationFunction;

// Available validation presets
type ValidationPreset = 'required';

// Validation function. Needs to return false or a string if validation fails,
// true otherwise
export type ValidationFunction = (value: string) => boolean | string;
```

:::

### `textarea`

::: tip
Instead of using this property, we advise using the [Text Area](/components/inputs/text-area) component instead. This allows better auto-completion of native textarea attributes.
:::

When set, it renders a `<textarea>` element instead of an `<input />` element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <textual-input textarea />
    <!-- [!code focus] -->
    <textual-input :textarea="true" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <textual-input textarea />
    <!-- [!code focus] -->
    <textual-input :textarea="true" />
</template>
```

:::

::: details Type definition

```ts
// If true, renders a <textarea> element instead of a <input> element.
textarea?: boolean;
```

:::

## Emits

The TextualInput element allows the default HTML events that are normally emitted. Apart from that it emits the following events:

### `validated`

If validators are provided in the props, and the value changes, the result of the validation is emitted.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { type ValidationResult, TextualInput } from '@enhanced-elements/inputs';

const model = ref<string>('my special value');

// [!code focus]
function handleValidation(result: ValidationResult): void {
    console.log('Is valid?', result.valid); // [!code focus]
    console.log('Failed validations', result.string); // [!code focus]
} // [!code focus]
</script>

<template>
    <!-- [!code focus] -->
    <textual-input v-model="model" @validated="handleValidation" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';

const model = ref('my special value');

// [!code focus]
function handleValidation(result) {
    console.log('Is valid?', result.valid); // [!code focus]
    console.log('Failed validations', result.string); // [!code focus]
} // [!code focus]
</script>

<template>
    <!-- [!code focus] -->
    <textual-input v-model="model" @validated="handleValidation" />
</template>
```

:::

::: details Event type definition

```ts
type ValidationResult = {
    valid: boolean;
    failed: string[];
};
```

:::

## Exposed functions

By utilizing [Vue template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs) you have access to additional functions. These can be programmatically triggered to perform the following actions.

### `focus`

Programmatically trigger focus on the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<HTMLInputElement>('textual-input');

function focus(): void {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <textual-input ref="textual-input" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('textual-input');

function focus() {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <textual-input ref="textual-input" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

:::

### `blur`

Programmatically remove focus from the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<HTMLInputElement>('textual-input');

function blur(): void {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <textual-input ref="textual-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('textual-input');

function blur() {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <textual-input ref="textual-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

:::

### `validate`

Programmatically trigger validation of the current value. Runs all the provided validators in order in which they are provided and returns the results.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { type ValidationFunction, TextualInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<HTMLInputElement>('textual-input');

// [!code focus]
const validators: ValidationFunction[] = [
    // [!code focus]
    (value: string) => (value && value.trim() !== '') || 'This field is required'
];

function validate(): void {
    // [!code focus]
    // If the value is empty, it logs:
    // [!code focus]
    // { valid: false, failed: ['This field is required'] }
    // [!code focus]
    console.log(element.value.validate());
}
</script>

<template>
    <!-- [!code focus] -->
    <textual-input ref="textual-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

```vue [JavaScript]
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('textual-input');

// [!code focus]
const validators = [
    // [!code focus]
    (value) => (value && value.trim() !== '') || 'This field is required'
];

function validate() {
    // [!code focus]
    // If the value is empty, it logs:
    // [!code focus]
    // { valid: false, failed: ['This field is required'] }
    // [!code focus]
    console.log(element.value.validate());
}
</script>

<template>
    <!-- [!code focus] -->
    <textual-input ref="textual-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

:::

::: details Return type definition

```ts
type ValidationResult = {
    valid: boolean;
    failed: string[];
};
```

:::
