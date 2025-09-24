<script setup lang="ts">
import { TextArea } from '@enhanced-elements/inputs';
import { ref } from 'vue';

const model = ref<string>('initial value');
</script>

<p class="example-container">
    <text-area class="example-element" v-model="model" />
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

        .focused {
            border: 1px solid var(--vp-c-brand-2);
        }
    }

    .model-value {
        display: flex;
        gap: 0.25rem;

        span {
            display: inline-block;
            font-weight: 600;
            font-style: italic;
            white-space: pre-wrap;
        }
    }
}
</style>

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { TextArea } from '@enhanced-elements/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref<string>('initial value'); // [!code focus]
</script>

<template>
    <p class="example-container">
        <!-- [!code focus] -->
        <text-area class="example-element" v-model="model" />
        <!-- [!code focus] -->
        <span class="model-value">
            <!-- [!code focus] -->
            Model value: <span>{{ model }}</span>
            <!-- [!code focus] -->
        </span>
    </p>
</template>

<style scoped>
.example-container {
    display: flex;
    gap: 1rem;
}

.example-container .example-element {
    border: 1px solid var(--vp-c-brand-1);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.example-container .example-element.focused {
    border: 1px solid var(--vp-c-brand-2);
}

.example-container .model-value {
    display: flex;
    gap: 0.25rem;
}

.example-container .model-value span {
    display: inline-block;
    font-weight: 500;
    font-style: italic;
    white-space: pre-wrap;
}
</style>
```

```vue [JavaScript]
<script setup>
import { TextArea } from '@enhanced-elements/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref('initial value'); // [!code focus]
</script>

<template>
    <p class="example-container">
        <!-- [!code focus] -->
        <text-area class="example-element" v-model="model" />
        <!-- [!code focus] -->
        <span class="model-value">
            <!-- [!code focus] -->
            Model value: <span>{{ model }}</span>
            <!-- [!code focus] -->
        </span>
    </p>
</template>

<style scoped>
.example-container {
    display: flex;
    gap: 1rem;
}

.example-container .example-element {
    border: 1px solid var(--vp-c-brand-1);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.example-container .example-element.focused {
    border: 1px solid var(--vp-c-brand-2);
}

.example-container .model-value {
    display: flex;
    gap: 0.25rem;
}

.example-container .model-value span {
    display: inline-block;
    font-weight: 500;
    font-style: italic;
    white-space: pre-wrap;
}
</style>
```

:::
