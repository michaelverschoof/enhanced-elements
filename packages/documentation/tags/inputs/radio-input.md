# Radio Input

## Basic usage

<!--@include: @/parts/examples/radio-input/basic.md-->

## Model

You can use the `v-model` as you're used to in Vue. Check the [official documentation](https://vuejs.org/api/built-in-directives.html#v-model) for more information on how to use models. You can use a `string` or any JavaScript value as the model. See the [documentation](https://vuejs.org/guide/essentials/forms.html#radio) on forms for more information.

## Props

The `RadioInput` element allows all default HTML properties and attributes. Apart from those the following properties are added:

### `value`

The value property is used to distinguish multiple radio inputs. This value will be set on the model when it's selected. This can be a static string, any JavaScript value or a dynamic value.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { RadioInput } from '@vuetags/inputs'; // [!code focus]
import { computed } from 'vue';

const objectValue: { value: string } = { value: 'second' }; // [!code focus]
const dynamicValue = computed<string>(() => 'third'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <radio-input value="first" />
        <!-- [!code focus] -->
        <radio-input :value="objectValue" />
        <!-- [!code focus] -->
        <radio-input :value="dynamicValue" />
    </p>
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs'; // [!code focus]
import { computed } from 'vue';

const objectValue = { value: 'second' }; // [!code focus]
const dynamicValue = computed(() => 'third'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <radio-input value="first" />
        <!-- [!code focus] -->
        <radio-input :value="objectValue" />
        <!-- [!code focus] -->
        <radio-input :value="dynamicValue" />
    </p>
</template>
```

:::

::: tip
To prevent issues, make sure to match the type of the value with the type of the model. Otherwise you might get unexpected behaviors.<br />
This example is only to showcase the different types of values.
:::

### `validators`

Validators are used to validate the user's input. Validation can be triggered manually by using the [validate](#validate) function.
These are either a single validator or an array of multiple validators. These can be predefined presets or custom functions.

#### A single validator

A single validator can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { RadioInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <radio-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <radio-input :validators="(value: string) => value === 'first'" />
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <radio-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <radio-input :validators="(value) => value === 'first'" />
</template>
```

:::

#### Multiple validators

Multiple validators can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { RadioInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value: string) => value === 'first';
</script>

<template>
    <!-- [!code focus] -->
    <radio-input :validators="['required', validatorFunction]" />
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value) => value === 'first';
</script>

<template>
    <!-- [!code focus] -->
    <radio-input :validators="['required', validatorFunction]" />
</template>
```

:::

<!--@include: @/parts/types/validation-function.md-->

## Emits

The `RadioInput` element allows the default HTML events that are normally emitted.

## Exposed functions

By utilizing [Vue template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs) you have access to additional functions. These can be programmatically triggered to perform the following actions.

### `focus`

Programmatically trigger focus on the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof RadioInput>>('radio-input');

function focus(): void {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('radio-input');

function focus() {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

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
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof RadioInput>>('radio-input');

function blur(): void {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('radio-input');

function blur() {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

:::

### `check`

Programmatically check the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof RadioInput>>('radio-input');

function check(): void {
    // [!code focus]
    element.value.check();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

    <!-- [!code focus] -->
    <button @click="check">Check the element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('radio-input');

function check() {
    // [!code focus]
    element.value.check();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

    <!-- [!code focus] -->
    <button @click="check">Check the element</button>
</template>
```

:::

### `uncheck`

Programmatically uncheck the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof RadioInput>>('radio-input');

function uncheck(): void {
    // [!code focus]
    element.value.uncheck();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

    <!-- [!code focus] -->
    <button @click="uncheck">Uncheck the element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('radio-input');

function uncheck() {
    // [!code focus]
    element.value.uncheck();
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" />

    <!-- [!code focus] -->
    <button @click="uncheck">Uncheck the element</button>
</template>
```

:::

### `validate`

Programmatically trigger validation of the current value. Runs all the provided validators in order in which they are provided and returns the results.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import type { ValidationFunction } from '@vuetags/inputs';
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof RadioInput>>('radio-input');

// [!code focus]
const validators: ValidationFunction[] = [
    // [!code focus]
    (value: string | unknown) => value === 'first' || 'This field is required'
];

function validate(): void {
    // [!code focus]
    // If the value is false, it logs:
    // [!code focus]
    // { valid: false, failed: ['This field is required'] }
    // [!code focus]
    console.log(element.value.validate());
}
</script>

<template>
    <!-- [!code focus] -->
    <radio-input ref="radio-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('radio-input');

// [!code focus]
const validators = [
    // [!code focus]
    (value) => value === 'first' || 'This field is required'
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
    <radio-input ref="radio-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

:::

<!--@include: @/parts/types/validation-result.md-->
