<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs';
import { ref } from 'vue';

const model = ref<string>('12345');
</script>

<p class="example-container">
    <numeric-input class="example-element" v-model="model" />
    Model value: {{ model }}
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
}
</style>

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { NumericInput } from '@enhanced-elements/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref<string>('12345'); // [!code focus]
</script>

<template>
    <p class="example-container">
        <!-- [!code focus] -->
        <numeric-input class="example-element" v-model="model" />
        <!-- [!code focus] -->
        Model value: {{ model }}
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
</style>
```

```vue [JavaScript]
<script setup>
import { NumericInput } from '@enhanced-elements/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref('12345'); // [!code focus]
</script>

<template>
    <p class="example-container">
        <!-- [!code focus] -->
        <numeric-input class="example-element" v-model="model" />
        <!-- [!code focus] -->
        Model value: {{ model }}
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
</style>
```

:::
