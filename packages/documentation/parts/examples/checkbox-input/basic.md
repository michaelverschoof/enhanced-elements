<script setup lang="ts">
import { CheckboxInput } from '@vuetags/inputs';
import type { CheckboxModel } from '@vuetags/inputs';
import { ref } from 'vue';

const model = ref<CheckboxModel>(false);
const listModel = ref<CheckboxModel>([]);
</script>

<p class="example-container">
    <strong>Boolean:</strong>
    <checkbox-input v-model="model" class="example-element" />
    <span class="model-value">
        Model value: <span>{{ model }}</span>
    </span>
</p>

<p class="example-container">
    <strong>Strings:</strong>
    <checkbox-input v-model="listModel" value="first" class="example-element" />
    <checkbox-input v-model="listModel" value="second" class="example-element" />
    <span class="model-value">
        Model value: <span>{{ listModel }}</span>
    </span>
</p>

<style lang="postcss" scoped>
.example-container {
    display: flex;
    gap: 1rem;

    .example-element {
        border: 1px solid var(--vp-c-brand-1);
        padding-left: 0.5rem;
        padding-right: 0.5rem;

        &.focused {
            border: 1px solid var(--vp-c-brand-2);
        }
    }

    .model-value {
        span {
            font-weight: 600;
            font-style: italic;
        }
    }
}
</style>

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { CheckboxInput } from '@vuetags/inputs'; // [!code focus]
import type { CheckboxModel } from '@vuetags/inputs';
import { ref } from 'vue';

const model = ref<CheckboxModel>(false); // [!code focus]
const listModel = ref<CheckboxModel>([]); // [!code focus]
</script>

<template>
    <p>
        <strong>Boolean:</strong>
        <!-- [!code focus] -->
        <checkbox-input v-model="model" />
        <!-- [!code focus] -->
        Model value: <span>{{ model }}</span>
    </p>

    <p>
        <strong>Strings:</strong>
        <!-- [!code focus] -->
        <checkbox-input v-model="listModel" value="first" />
        <!-- [!code focus] -->
        <checkbox-input v-model="listModel" value="second" />
        <!-- [!code focus] -->
        Model value: <span>{{ listModel }}</span>
    </p>
</template>
```

```vue [JavaScript]
<script setup>
import { CheckboxInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref(false); // [!code focus]
const listModel = ref([]); // [!code focus]
</script>

<template>
    <p>
        <strong>Boolean:</strong>
        <!-- [!code focus] -->
        <checkbox-input v-model="model" />
        <!-- [!code focus] -->
        Model value: <span>{{ model }}</span>
    </p>

    <p>
        <strong>Strings:</strong>
        <!-- [!code focus] -->
        <checkbox-input v-model="listModel" value="first" />
        <!-- [!code focus] -->
        <checkbox-input v-model="listModel" value="second" />
        <!-- [!code focus] -->
        Model value: <span>{{ listModel }}</span>
    </p>
</template>
```

:::
