<script setup lang="ts">
import { CheckableInput } from '@enhanced-elements/inputs';
import { ref, useTemplateRef } from 'vue';
import InputContainer from './components/input-container.vue';

const checkboxModel = ref<string[]>([]);
const checkboxElement = useTemplateRef('checkbox-element');

function toggleCheckbox() {
    if (checkboxModel.value.includes('a')) {
        checkboxElement.value?.uncheck();
        return;
    }

    checkboxElement.value?.check();
}
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" />

        <h1 class="green">Enhanced elements</h1>
    </header>

    <main>
        <input-container title="Checkable input">
            <template #inputs>
                <checkable-input ref="checkbox-element" v-model="checkboxModel" value="a" />
                <checkable-input v-model="checkboxModel" value="b" />
                <checkable-input v-model="checkboxModel" value="c" />
                <div>Value: {{ checkboxModel }}</div>
            </template>

            <template #buttons>
                <button @click="toggleCheckbox">Toggle checkbox</button>
            </template>
        </input-container>
    </main>
</template>

<style lang="postcss" scoped>
header {
    .logo {
        display: block;
        width: 6rem;
    }

    h1 {
        font-weight: 500;
        font-size: 2.6rem;
    }
}

main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        gap: 2rem;
    }
}
</style>
