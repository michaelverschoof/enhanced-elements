::: code-group

```vue [Typescript] {2,8}
<script setup lang="ts">
import { TextualInput } from '@enhanced-elements/inputs';

const model = ref<string>('my special value');
</script>

<template>
    <textual-input v-model="model" />
</template>
```

```vue [JavaScript] {2,8}
<script setup>
import { TextualInput } from '@enhanced-elements/inputs';

const model = ref('my special value');
</script>

<template>
    <textual-input v-model="model" />
</template>
```

:::
