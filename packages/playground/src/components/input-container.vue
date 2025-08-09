<template>
    <section>
        <h3 class="green">{{ title }}</h3>

        <div class="container">
            <div class="inputs">
                <slot name="inputs" />
            </div>

            <div v-if="$slots.buttons" class="buttons">
                <slot name="buttons" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style lang="postcss" scoped>
section {
    padding: 1rem;
    border: 1px solid var(--color-border);

    .container {
        display: flex;
        justify-content: space-between;

        .inputs {
            display: flex;
            gap: 0.5rem;
        }

        .buttons {
            display: flex;
            gap: 0.25rem;
        }
    }
}
</style>
