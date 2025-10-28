<script setup lang="ts">
import { PasswordInput } from '@vuetags/inputs';
import { ref } from 'vue';

const showing = ref<boolean>(false);

const model = ref<string>('password');
</script>

<p class="example-container">
    <password-input v-model="model" :show-password="showing" class="example-element" />
    <button @click="showing = !showing">
        {{ showing ? 'hide' : 'show' }}
    </button>
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

    button {
        border: 1px solid var(--vp-c-brand-3);
        background: rgba(62, 99, 221, 0.5);
        border-radius: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
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
import { PasswordInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const showing = ref<boolean>(false); // [!code focus]

const model = ref<string>('12345'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <password-input v-model="model" :show-password="showing" />

        <!-- [!code focus] -->
        <button @click="showing = !showing">
            <!-- [!code focus] -->
            {{ showing ? 'hide' : 'show' }}
            <!-- [!code focus] -->
        </button>

        <!-- [!code focus] -->
        Model value: <span>{{ model }}</span>
    </p>
</template>
```

```vue [JavaScript]
<script setup>
import { PasswordInput } from '@vuetags/inputs'; // [!code focus]
import { ref } from 'vue';

const showing = ref(false); // [!code focus]

const model = ref('12345'); // [!code focus]
</script>

<template>
    <p>
        <!-- [!code focus] -->
        <password-input v-model="model" :show-password="showing" />

        <!-- [!code focus] -->
        <button @click="showing = !showing">
            <!-- [!code focus] -->
            {{ showing ? 'hide' : 'show' }}
            <!-- [!code focus] -->
        </button>

        <!-- [!code focus] -->
        Model value: <span>{{ model }}</span>
    </p>
</template>
```

:::
