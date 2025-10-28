<script setup lang="ts">
import { FileInput } from '@vuetags/inputs';
import { ref } from 'vue';

const model = ref<File[]>([]);
</script>

<p class="example-container">
    <file-input v-model="model" class="example-element" multiple />
    <span class="model-value">
        Model Value (file names):
        <ul>
            <li v-for="file of model">{{ file.name }}</li>
        </ul>
    </span>
</p>

<style lang="postcss" scoped>
.example-container {
    align-items: flex-start;
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

        ul {
            margin: 0;

            li {
                font-size: 0.8rem;
                line-height: 1.25rem;
                margin: 0;
            }
        }
    }
}
</style>

::: code-group

```vue [Typescript]
<script setup lang="ts">
import { FileInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref<File[]>([]); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <file-input v-model="model" multiple />
        <!-- [!code focus] -->
        Model Value (file names):
        <ul>
            <!-- [!code focus] -->
            <li v-for="file of model">{{ file.name }}</li>
        </ul>
    </p>
</template>
```

```vue [JavaScript]
<script setup>
import { FileInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const model = ref([]); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <file-input v-model="model" multiple />
        <!-- [!code focus] -->
        Model Value (file names):
        <ul>
            <!-- [!code focus] -->
            <li v-for="file of model">{{ file.name }}</li>
        </ul>
    </p>
</template>
```

:::
