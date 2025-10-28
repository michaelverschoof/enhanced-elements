# File Input

## Basic usage

<!--@include: @/parts/examples/file-input/basic.md-->

## Model

You can use the `v-model` as you're used to in Vue. Check the [official documentation](https://vuejs.org/api/built-in-directives.html#v-model) for more information on how to use models.

::: warning
Note that the HTML file input does not allow setting files programmatically. So if you set the model from the parent, the input element will not show that files are selected. The component will contain the set files though.
:::

## Props

The `FileInput` element allows all default HTML properties and attributes. Apart from those the following properties are added:

### `validators`

Validators are used to validate the user's input. Validation can be triggered manually by using the [validate](#validate) function.
These are either a single validator or an array of multiple validators. These can be predefined presets or custom functions.

#### A single validator

A single validator can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { FileInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <file-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <file-input :validators="(value: File[]) => value.length > 3" />
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <file-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <file-input :validators="(value) => value.length > 3" />
</template>
```

:::

#### Multiple validators

Multiple validators can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { FileInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value: File[]) => value.length > 3;
</script>

<template>
    <!-- [!code focus] -->
    <file-input :validators="['required', validatorFunction]" />
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value) => value.length > 3;
</script>

<template>
    <!-- [!code focus] -->
    <file-input :validators="['required', validatorFunction]" />
</template>
```

:::

<!--@include: @/parts/types/validation-function.md-->

## Emits

The `FileInput` element allows the default HTML events that are normally emitted.

## Exposed functions

By utilizing [Vue template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs) you have access to additional functions. These can be programmatically triggered to perform the following actions.

### `focus`

Programmatically trigger focus on the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof FileInput>>('file-input');

function focus(): void {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('file-input');

function focus() {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

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
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof FileInput>>('file-input');

function blur(): void {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('file-input');

function blur() {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

:::

### `select`

Programmatically trigger the file select interaction.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof FileInput>>('file-input');

function select(): void {
    // [!code focus]
    element.value.select();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

    <!-- [!code focus] -->
    <button @click="select">Trigger file select</button>
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('file-input');

function select() {
    // [!code focus]
    element.value.select();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

    <!-- [!code focus] -->
    <button @click="select">Trigger file select</button>
</template>
```

:::

### `clear`

Programmatically clear all selected files.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof FileInput>>('file-input');

function clear(): void {
    // [!code focus]
    element.value.clear();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

    <!-- [!code focus] -->
    <button @click="clear">Trigger file clear</button>
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('file-input');

function clear() {
    // [!code focus]
    element.value.clear();
}
</script>

<template>
    <!-- [!code focus] -->
    <file-input ref="file-input" />

    <!-- [!code focus] -->
    <button @click="clear">Trigger file clear</button>
</template>
```

:::

### `validate`

Programmatically trigger validation of the current value. Runs all the provided validators in order in which they are provided and returns the results.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import type { ValidationFunction } from '@vuetags/inputs';
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof FileInput>>('file-input');

// [!code focus]
const validators: ValidationFunction[] = [
    // [!code focus]
    (value: File[]) => value.length > 0 || 'This field is required'
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
    <file-input ref="file-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('file-input');

// [!code focus]
const validators = [
    // [!code focus]
    (value) => value.length > 0 || 'This field is required'
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
    <file-input ref="file-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

:::

<!--@include: @/parts/types/validation-result.md-->
