<script setup lang="ts">
import { TextInput } from '@vuetags/inputs';
import { ref } from 'vue';

const model = ref<string>('initial value');
</script>

<p class="example-container">
    <text-input v-model="model" class="example-element" />
    <span class="model-value">
        Model value: <span>{{ model }}</span>
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
import { TextInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref<string>('initial value'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <text-input v-model="model" />

        <!-- [!code focus] -->
        Model value: <span>{{ model }}</span>
    </p>
</template>
```

```vue [JavaScript]
<script setup>
import { TextInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref('initial value'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <text-input v-model="model" />

        <!-- [!code focus] -->
        Model value: <span>{{ model }}</span>
    </p>
</template>
```

:::
