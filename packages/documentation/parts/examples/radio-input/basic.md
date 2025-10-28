<script setup lang="ts">
import { RadioInput } from '@vuetags/inputs';
import { ref } from 'vue';

const stringModel = ref<string>('first');
const objectModel = ref<{ value: string; }>({ value: 'first' });
</script>

<p class="example-container">
    <strong>Strings:</strong>
    <radio-input v-model="stringModel" value="first" class="example-element" />
    <radio-input v-model="stringModel" value="second" class="example-element" />
    <span class="model-value">
        Model value: <span>{{ stringModel }}</span>
    </span>
</p>

<p class="example-container">
    <strong>Objects:</strong>
    <radio-input v-model="objectModel" :value="{ value: 'first' }" class="example-element" />
    <radio-input v-model="objectModel" :value="{ value: 'second' }" class="example-element" />
    <span class="model-value">
        Model value: <span>{{ objectModel }}</span>
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
import { RadioInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const stringModel = ref<string>('first'); // [!code focus]
const objectModel = ref<{ value: string }>({ value: 'first' }); // [!code focus]
</script>

<template>
    <p>
        <strong>Strings:</strong>
        <!-- [!code focus] -->
        <radio-input v-model="stringModel" value="first" />
        <!-- [!code focus] -->
        <radio-input v-model="stringModel" value="second" />

        <!-- [!code focus] -->
        Model value: <span>{{ stringModel }}</span>
    </p>

    <p>
        <strong>Objects:</strong>
        <!-- [!code focus] -->
        <radio-input v-model="objectModel" :value="{ value: 'first' }" />
        <!-- [!code focus] -->
        <radio-input v-model="objectModel" :value="{ value: 'second' }" />

        <!-- [!code focus] -->
        Model value: <span>{{ objectModel }}</span>
    </p>
</template>
```

```vue [JavaScript]
<script setup>
import { RadioInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const stringModel = ref('first'); // [!code focus]
const objectModel = ref({ value: 'first' }); // [!code focus]
</script>

<template>
    <p>
        <strong>Strings:</strong>
        <!-- [!code focus] -->
        <radio-input v-model="stringModel" value="first" />
        <!-- [!code focus] -->
        <radio-input v-model="stringModel" value="second" />

        <!-- [!code focus] -->
        Model value: <span>{{ stringModel }}</span>
    </p>

    <p>
        <strong>Objects:</strong>
        <!-- [!code focus] -->
        <radio-input v-model="objectModel" :value="{ value: 'first' }" />
        <!-- [!code focus] -->
        <radio-input v-model="objectModel" :value="{ value: 'second' }" />

        <!-- [!code focus] -->
        Model value: <span>{{ objectModel }}</span>
    </p>
</template>
```

:::
