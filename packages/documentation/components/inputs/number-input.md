# Number Input

## Basic usage

<!--@include: @/parts/examples/number-input/basic.md-->

## Model

You can use the `v-model` as you're used to in Vue. Check the [official documentation](https://vuejs.org/api/built-in-directives.html#v-model) for more information on how to use models.

## Props

The `NumericInput` element allows all default HTML properties and attributes. Apart from those the following properties are added:

### `filters`

Filters can be used to filter out characters on input. This prevents characters from being added when typing, when pasting and when providing an initial value. These are either a single filter or an array of multiple filters. They can be regular expressions or custom functions.

When you use multiple filters, they are executed in order in which they are provided.

### A single filter

A single filter can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const filter = (value: string) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single regular expression -->
    <!-- [!code focus] -->
    <numeric-input :filters="/[^7]/g" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <numeric-input :filters="filter" />
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const filter = (value) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single regular expression -->
    <!-- [!code focus] -->
    <numeric-input :filters="/[^7]/g" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <numeric-input :filters="filter" />
</template>
```

:::

#### Multiple filters

Multiple filters can be added as an array. This can be a combination of custom functions and/or regular expressions.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const filter = (value: string) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input :filters="[/[^7]/g, filter]" />
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const filter = (value) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input :filters="[/[^7]/g, filter]" />
</template>
```

:::

::: details Type definition

```ts
// One or more filter presets, regular expressions and/or custom functions
filters?: Filters | Filters[];

// Combination of presets and/or functions
type Filters = RegExp | TransformFunction;

// Filter function. Needs to return a string.
type TransformFunction = (value: string) => string;
```

:::

### `modifiers`

Modifiers can be used to modify values on input. This modifies the value when typing, when pasting and when providing an initial value. These are either a single filter or an array of multiple modifiers. They can be regular expressions or custom functions.

When you use multiple modifiers, they are executed in order in which they are provided.

### A single modifier

A single modifier can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const modifier = (value: string) => (Number(value) * 2)?.toString();
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <numeric-input :modifiers="modifier" />
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const modifier = (value: string) => (Number(value) * 2)?.toString();
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <numeric-input :modifiers="modifier" />
</template>
```

:::

#### Multiple modifiers

Multiple modifiers can be added as an array.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const double = (value: string) => (Number(value) * 2)?.toString();
// [!code focus]
const increase = (value: string) => (Number(value) + 1)?.toString();
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input :modifiers="[double, increase]" />
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const double = (value) => (Number(value) * 2)?.toString();
const increase = (value) => (Number(value) + 1)?.toString();
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input :modifiers="[double, increase]" />
</template>
```

:::

::: details Type definition

```ts
// One or more modifier presets and/or custom functions
modifiers?: Modifiers | Modifiers[];

// Combination of presets and/or functions
type Modifiers = TransformFunction;

// Modifier function. Needs to return a string.
type TransformFunction = (value: string) => string;
```

:::

### `validators`

Validators are used to validate the user's input. The validators are triggered when the value is updated. Validation can also be triggered manually by using the [validate](#validate) function.
These are either a single validator or an array of multiple validators. These can be predefined presets or custom functions.

#### A single validator

A single validator can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <numeric-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <numeric-input :validators="(value: string) => value?.length > 5" />
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <numeric-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <numeric-input :validators="(value) => value?.length > 5" />
</template>
```

:::

#### Multiple validators

Multiple validators can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const validatorFunction = (value: string) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input :validators="['required', validatorFunction]" />
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';

// [!code focus]
const validatorFunction = (value) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input :validators="['required', validatorFunction]" />
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

:::

## Emits

The NumericInput element allows the default HTML events that are normally emitted. Apart from that it emits the following events:

### `validated`

If validators are provided in the props, and the value changes, the result of the validation is emitted.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { type ValidationResult, NumericInput } from '@enhanced-elements/inputs';

const model = ref<string>('my special value');

// [!code focus]
function handleValidation(result: ValidationResult): void {
    console.log('Is valid?', result.valid); // [!code focus]
    console.log('Failed validations', result.string); // [!code focus]
} // [!code focus]
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input v-model="model" @validated="handleValidation" />
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';

const model = ref('my special value');

// [!code focus]
function handleValidation(result) {
    console.log('Is valid?', result.valid); // [!code focus]
    console.log('Failed validations', result.string); // [!code focus]
} // [!code focus]
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input v-model="model" @validated="handleValidation" />
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
import { NumericInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<HTMLInputElement>('numeric-input');

function focus(): void {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input ref="numeric-input" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('numeric-input');

function focus() {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input ref="numeric-input" />

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
import { NumericInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<HTMLInputElement>('numeric-input');

function blur(): void {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input ref="numeric-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('numeric-input');

function blur() {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <numeric-input ref="numeric-input" />

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
import { type ValidationFunction, NumericInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<HTMLInputElement>('numeric-input');

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
    <numeric-input ref="numeric-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('numeric-input');

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
    <numeric-input ref="numeric-input" :validators="validators" />

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
