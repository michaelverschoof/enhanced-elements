::: code-group

```vue [Typescript] {2,8}
<script setup lang="ts">
import { TextInput } from '@enhanced-elements/inputs';

const model = ref<string>('my special value');
</script>

<template>
    <text-input v-model="model" />
</template>
```

```vue [JavaScript] {2,8}
<script setup>
import { TextInput } from '@enhanced-elements/inputs';

const model = ref('my special value');
</script>

<template>
    <text-input v-model="model" />
</template>
```

:::
