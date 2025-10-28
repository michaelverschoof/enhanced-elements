# Password Input

## Basic usage

<!--@include: @/parts/examples/password-input/basic.md-->

## Model

You can use the `v-model` as you're used to in Vue. Check the [official documentation](https://vuejs.org/api/built-in-directives.html#v-model) for more information on how to use models.

## Props

The `PasswordInput` element allows all default HTML properties and attributes. Apart from those the following properties are added:

### `filters`

Filters can be used to filter out characters on input. This prevents characters from being added when typing, when pasting and when providing an initial value. These are either a single filter or an array of multiple filters. They can be regular expressions or custom functions.

When you use multiple filters, they are executed in order in which they are provided.

### A single filter

A single filter can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const filter = (value: string) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single regular expression -->
    <!-- [!code focus] -->
    <password-input :filters="/[^7]/g" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <password-input :filters="filter" />
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const filter = (value) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single regular expression -->
    <!-- [!code focus] -->
    <password-input :filters="/[^7]/g" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <password-input :filters="filter" />
</template>
```

:::

#### Multiple filters

Multiple filters can be added as an array. This can be a combination of custom functions and/or regular expressions.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const filter = (value: string) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <password-input :filters="[/[^7]/g, filter]" />
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const filter = (value) => (value.match(/[^5]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <password-input :filters="[/[^7]/g, filter]" />
</template>
```

:::

<!--@include: @/parts/types/filter-function-without-presets.md-->

### `modifiers`

Modifiers can be used to modify values on input. This modifies the value when typing, when pasting and when providing an initial value. These are either a single filter or an array of multiple modifiers. They can be regular expressions or custom functions.

When you use multiple modifiers, they are executed in order in which they are provided.

### A single modifier

A single modifier can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const modifier = (value: string) => value.toUpperCase();
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <password-input :modifiers="modifier" />
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const modifier = (value: string) => value.toUpperCase();
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <password-input :modifiers="modifier" />
</template>
```

:::

#### Multiple modifiers

Multiple modifiers can be added as an array.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const uppercase = (value: string) => value.toUpperCase();
// [!code focus]
const addValue = (value: string) => value + ' additional value';
</script>

<template>
    <!-- [!code focus] -->
    <password-input :modifiers="[uppercase, addValue]" />
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const uppercase = (value) => value.toUpperCase();
// [!code focus]
const addValue = (value) => value + ' additional value';
</script>

<template>
    <!-- [!code focus] -->
    <password-input :modifiers="[uppercase, addValue]" />
</template>
```

:::

<!--@include: @/parts/types/modifier-function-without-presets.md-->

### `validators`

Validators are used to validate the user's input. Validation can be triggered manually by using the [validate](#validate) function.
These are either a single validator or an array of multiple validators. These can be predefined presets or custom functions.

#### A single validator

A single validator can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <password-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <password-input :validators="(value: string) => value?.length > 5" />
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <password-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <password-input :validators="(value) => value?.length > 5" />
</template>
```

:::

#### Multiple validators

Multiple validators can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value: string) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <password-input :validators="['required', validatorFunction]" />
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <password-input :validators="['required', validatorFunction]" />
</template>
```

:::

<!--@include: @/parts/types/validation-function.md-->

## Emits

The `PasswordInput` element allows the default HTML events that are normally emitted.

## Exposed functions

By utilizing [Vue template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs) you have access to additional functions. These can be programmatically triggered to perform the following actions.

### `focus`

Programmatically trigger focus on the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof PasswordInput>>('password-input');

function focus(): void {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <password-input ref="password-input" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('password-input');

function focus() {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <password-input ref="password-input" />

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
import { PasswordInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof PasswordInput>>('password-input');

function blur(): void {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <password-input ref="password-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('password-input');

function blur() {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <password-input ref="password-input" />

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
import { type ValidationFunction, PasswordInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof PasswordInput>>('password-input');

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
    <password-input ref="password-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('password-input');

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
    <password-input ref="password-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

:::

<!--@include: @/parts/types/validation-result.md-->
