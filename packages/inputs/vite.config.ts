import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@test': fileURLToPath(new URL('./test', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
