# Checkbox Input

## Basic usage

<!--@include: @/parts/examples/checkbox-input/basic.md-->

## Model

You can use the `v-model` as you're used to in Vue. Check the [official documentation](https://vuejs.org/api/built-in-directives.html#v-model) for more information on how to use models. You can use a `boolean` for a single checkbox or an `Array` or `Set` when combining multiple checkboxes. See the [documentation](https://vuejs.org/guide/essentials/forms.html#checkbox) on forms for more information.

::: info
The model in the component makes sure that there are no duplicate values in the model. You should not use multiple checkboxes using the same model that have the same value.
:::

## Props

The `CheckboxInput` element allows all default HTML properties and attributes. Apart from those the following properties are added:

### `value`

The value property is used to distinguish multiple combined checkboxes. This value will be added to the model when it's selected. This can be a static string or a dynamic value.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { CheckboxInput } from '@vuetags/inputs'; // [!code focus]
import { computed } from 'vue';

const dynamicValue = computed<string>(() => 'some value'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <checkbox-input value="first" />
        <!-- [!code focus] -->
        <checkbox-input :value="dynamicValue" />
    </p>
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs'; // [!code focus]
import { computed } from 'vue';

const dynamicValue = computed(() => 'some value'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <checkbox-input value="first" />
        <!-- [!code focus] -->
        <checkbox-input :value="dynamicValue" />
    </p>
</template>
```

:::

### `validators`

Validators are used to validate the user's input. Validation can be triggered manually by using the [validate](#validate) function.
These are either a single validator or an array of multiple validators. These can be predefined presets or custom functions.

#### A single validator

A single validator can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { CheckboxInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <checkbox-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <checkbox-input :validators="(value: boolean) => value === true" />
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <checkbox-input validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <checkbox-input :validators="(value) => value === true" />
</template>
```

:::

#### Multiple validators

Multiple validators can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { CheckboxInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value: string[]) => value.length > 1;
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input :validators="['required', validatorFunction]" />
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value) => value.length > 1;
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input :validators="['required', validatorFunction]" />
</template>
```

:::

<!--@include: @/parts/types/validation-function.md-->

## Emits

The `CheckboxInput` element allows the default HTML events that are normally emitted.

## Exposed functions

By utilizing [Vue template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs) you have access to additional functions. These can be programmatically triggered to perform the following actions.

### `focus`

Programmatically trigger focus on the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof CheckboxInput>>('checkbox-input');

function focus(): void {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('checkbox-input');

function focus() {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

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
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof CheckboxInput>>('checkbox-input');

function blur(): void {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('checkbox-input');

function blur() {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

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
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof CheckboxInput>>('checkbox-input');

function check(): void {
    // [!code focus]
    element.value.check();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

    <!-- [!code focus] -->
    <button @click="check">Check the element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('checkbox-input');

function check() {
    // [!code focus]
    element.value.check();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

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
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof CheckboxInput>>('checkbox-input');

function uncheck(): void {
    // [!code focus]
    element.value.uncheck();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

    <!-- [!code focus] -->
    <button @click="uncheck">Uncheck the element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('checkbox-input');

function uncheck() {
    // [!code focus]
    element.value.uncheck();
}
</script>

<template>
    <!-- [!code focus] -->
    <checkbox-input ref="checkbox-input" />

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
import { CheckboxInput } from '@vuetags/inputs';
import type { CheckboxModel } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof CheckboxInput>>('checkbox-input');

// [!code focus]
const validators: ValidationFunction[] = [
    // [!code focus]
    (value: CheckboxModel) => value === true || 'This field is required'
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
    <checkbox-input ref="checkbox-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('checkbox-input');

// [!code focus]
const validators = [
    // [!code focus]
    (value) => value === true || 'This field is required'
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
    <checkbox-input ref="checkbox-input" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

:::

<!--@include: @/parts/types/validation-result.md-->
