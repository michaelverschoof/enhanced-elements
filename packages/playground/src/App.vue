<script setup lang="ts">
import { CheckboxInput, FileInput, PasswordInput, RadioInput, TextInput } from '@vuetags/inputs';
import { ref, useTemplateRef } from 'vue';
import InputContainer from './components/input-container.vue';

const inputFiles = ref<File[]>([]);
const fileInputElement = useTemplateRef('file-input-element');

function openSelect() {
    fileInputElement.value?.select();
}

function clearFiles() {
    fileInputElement.value?.clear();
}

const checkboxModel = ref<string[]>([]);
const checkboxElement = useTemplateRef('checkbox-element');

const textModel = ref<string>('some text');
const nativeCheckboxModel = ref<Set<string>>(new Set());

const radioModel = ref<string>('test');

function toggleCheckbox() {
    if (checkboxModel.value.includes('a')) {
        checkboxElement.value?.uncheck();
        return;
    }

    checkboxElement.value?.check();
}

function toggleNativeCheckbox() {
    if (nativeCheckboxModel.value.has('a')) {
        nativeCheckboxModel.value.delete('a');
        return;
    }

    nativeCheckboxModel.value.add('a');
}

const passwordModel = ref<string>('test');
const showPassword = ref<boolean>(false);
const passwordElement = useTemplateRef('password-element');

function togglePasswordProp() {
    showPassword.value = !showPassword.value;
}

function togglePasswordFunction() {
    if (showPassword.value) {
        passwordElement.value?.hidePassword();
        showPassword.value = false;
        return;
    }

    passwordElement.value?.showPassword();
    showPassword.value = true;
}
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" />

        <h1 class="green">VueTags</h1>
    </header>

    <main>
        <input-container title="File">
            <template #inputs>
                <file-input ref="file-input-element" v-model="inputFiles" :validators="[]" />
                <div>Files: {{ inputFiles.map((file) => file.name).join(', ') }}</div>
            </template>
            <template #buttons>
                <button :disabled="inputFiles.length === 0" @click="clearFiles">Clear</button>
                <button @click="openSelect">Select</button>
            </template>
        </input-container>

        <input-container title="Password">
            <template #inputs>
                <password-input :show-password="showPassword" v-model="passwordModel" />
                <div>Value: {{ passwordModel }}</div>
            </template>
            <template #buttons>
                <button @click="togglePasswordProp">Toggle prop</button>
            </template>
        </input-container>

        <input-container title="Password">
            <template #inputs>
                <password-input ref="password-element" v-model="passwordModel" />
                <div>Value: {{ passwordModel }}</div>
            </template>
            <template #buttons>
                <button @click="togglePasswordFunction">Toggle function</button>
            </template>
        </input-container>

        <input-container title="Checkbox input">
            <template #inputs>
                <radio-input v-model="radioModel" value="test" />
                <div>Value: {{ radioModel }}</div>
            </template>
        </input-container>

        <input-container title="Text input">
            <template #inputs>
                <text-input v-model="textModel" />
                <div>Value: {{ textModel }}</div>
            </template>
        </input-container>

        <input-container title="Checkbox input">
            <template #inputs>
                <checkbox-input ref="checkbox-element" v-model="checkboxModel" value="a" />
                <checkbox-input v-model="checkboxModel" value="b" />
                <checkbox-input v-model="checkboxModel" value="c" />
                <div>Value: {{ checkboxModel }}</div>
            </template>

            <template #buttons>
                <button @click="toggleCheckbox">Toggle checkbox</button>
            </template>
        </input-container>

        <input-container title="Native checkbox">
            <template #inputs>
                <input type="checkbox" name="native" v-model="nativeCheckboxModel" value="a" />
                <input type="checkbox" name="native" v-model="nativeCheckboxModel" value="b" />
                <input type="checkbox" name="native" v-model="nativeCheckboxModel" value="c" />
                <div>Value: {{ nativeCheckboxModel }}</div>
            </template>
            <template #buttons>
                <button @click="toggleNativeCheckbox">Toggle checkbox</button>
            </template>
        </input-container>
    </main>
</template>

<style lang="postcss" scoped>
.focused {
    color: red;
}

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
