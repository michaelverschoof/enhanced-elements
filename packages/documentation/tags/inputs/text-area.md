# Text Area

## Basic usage

<!--@include: @/parts/examples/text-area/basic.md-->

## Model

You can use the `v-model` as you're used to in Vue. Check the [official documentation](https://vuejs.org/api/built-in-directives.html#v-model) for more information on how to use models.

You can add the existing [Vue model modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers) to the model. Besides that there are additional modifiers you can add:

### `uppercase`

The uppercase modifier changes the value (as you've guessed) to an uppercased variant.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';

const model = ref<string>('my special value');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "foo" as "FOO" -->
    <!-- [!code focus] -->
    <text-area v-model.uppercase="model" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';

const model = ref('my special value');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "foo" as "FOO" -->
    <!-- [!code focus] -->
    <text-area v-model.uppercase="model" />
</template>
```

:::

### `lowercase`

The uppercase modifier changes the value (shockingly) to an lowercased variant.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';

const model = ref<string>('FOO');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "FOO" as "foo" -->
    <!-- [!code focus] -->
    <text-area v-model.lowercase="model" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';

const model = ref('FOO');
</script>

<template>
    <!-- [!code focus] -->
    <!-- Will display the value "FOO" as "foo" -->
    <!-- [!code focus] -->
    <text-area v-model.lowercase="model" />
</template>
```

:::

## Props

The `TextArea` element allows all default HTML properties and attributes. Apart from those the following properties are added:

### `filters`

Filters can be used to filter out characters on input. This prevents characters from being added when typing, when pasting and when providing an initial value. These are either a single filter or an array of multiple filters. They can be predefined presets, regular expressions or custom functions.

When you use multiple filters, they are executed in order in which they are provided.

### A single filter

A single filter can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const filter = (value: string) => (value.match(/[^A-Za-z]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <text-area filters="letters" />
    <!-- [!code focus] -->
    <!-- A single regular expression -->
    <!-- [!code focus] -->
    <text-area :filters="/[^A-Za-z]/g" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <text-area :filters="filter" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const filter = (value) => (value.match(/[^A-Za-z]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <text-area filters="letters" />
    <!-- [!code focus] -->
    <!-- A single regular expression -->
    <!-- [!code focus] -->
    <text-area :filters="/[^A-Za-z]/g" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <text-area :filters="filter" />
</template>
```

:::

#### Multiple filters

Multiple filters can be added as an array. This can be a combination of custom functions, regular expressions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const filter = (value: string) => (value.match(/[^A-Za-z]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <text-area :filters="['letters', /[^A-Za-z]/g, filter]" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const filter = (value) => (value.match(/[^A-Za-z]/g) || []).join('');
</script>

<template>
    <!-- [!code focus] -->
    <text-area :filters="['letters', /[^A-Za-z]/g, filter]" />
</template>
```

:::

<!--@include: @/parts/types/filter-function.md-->

### `modifiers`

Modifiers can be used to modify values on input. This modifies the value when typing, when pasting and when providing an initial value. These are either a single filter or an array of multiple modifiers. They can be predefined presets, regular expressions or custom functions.

When you use multiple modifiers, they are executed in order in which they are provided.

### A single modifier

A single modifier can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const modifier = (value: string) => value.toUpperCase();
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <text-area modifiers="uppercase" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <text-area :modifiers="modifier" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const modifier = (value) => value.toUpperCase();
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <text-area modifiers="uppercase" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <text-area :modifiers="modifier" />
</template>
```

:::

#### Multiple modifiers

Multiple modifiers can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const modifier = (value: string) => value.toUpperCase();
</script>

<template>
    <!-- [!code focus] -->
    <text-area :modifiers="['uppercase', modifier]" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const modifier = (value) => value.toUpperCase();
</script>

<template>
    <!-- [!code focus] -->
    <text-area :modifiers="['uppercase', modifier]" />
</template>
```

:::

<!--@include: @/parts/types/modifier-function.md-->

### `validators`

Validators are used to validate the user's input. Validation can be triggered manually by using the [validate](#validate) function.
These are either a single validator or an array of multiple validators. These can be predefined presets or custom functions.

#### A single validator

A single validator can be directly added to the prop. This can be done directly in the template or as a variable.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <text-area validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <text-area :validators="(value: string) => value?.length > 5" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';
</script>

<template>
    <!-- [!code focus] -->
    <!-- A single preset -->
    <!-- [!code focus] -->
    <text-area validators="required" />
    <!-- [!code focus] -->
    <!-- A single function -->
    <!-- [!code focus] -->
    <text-area :validators="(value) => value?.length > 5" />
</template>
```

:::

#### Multiple validators

Multiple validators can be added as an array. This can be a combination of custom functions and/or presets.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value: string) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <text-area :validators="['required', validatorFunction]" />
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';

// [!code focus]
const validatorFunction = (value) => value?.length > 5;
</script>

<template>
    <!-- [!code focus] -->
    <text-area :validators="['required', validatorFunction]" />
</template>
```

:::

<!--@include: @/parts/types/validation-function.md-->

## Emits

The TextArea element allows the default HTML events that are normally emitted.

## Exposed functions

By utilizing [Vue template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs) you have access to additional functions. These can be programmatically triggered to perform the following actions.

### `focus`

Programmatically trigger focus on the element.

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof TextArea>>('text-area');

function focus(): void {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <text-area ref="text-area" />

    <!-- [!code focus] -->
    <button @click="focus">Trigger focus on element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('text-area');

function focus() {
    // [!code focus]
    element.value.focus();
}
</script>

<template>
    <!-- [!code focus] -->
    <text-area ref="text-area" />

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
import { TextArea } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof TextArea>>('text-area');

function blur(): void {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <text-area ref="text-area" />

    <!-- [!code focus] -->
    <button @click="blur">Remove focus from element</button>
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('text-area');

function blur() {
    // [!code focus]
    element.value.blur();
}
</script>

<template>
    <!-- [!code focus] -->
    <text-area ref="text-area" />

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
import { type ValidationFunction, TextArea } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef<InstanceType<typeof TextArea>>('text-area');

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
    <text-area ref="text-area" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@vuetags/inputs';
import { useTemplateRef } from 'vue';

// [!code focus]
const element = useTemplateRef('text-area');

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
    <text-area ref="text-area" :validators="validators" />

    <!-- [!code focus] -->
    <button @click="validate">Validate value</button>
</template>
```

:::

<!--@include: @/parts/types/validation-result.md-->
