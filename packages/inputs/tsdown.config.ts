import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown';

export default defineConfig({
    entry: './src/index.ts',
    plugins: [Vue({ isProduction: true })],
    external: ['vue', '@vueuse/core'], // TODO: Check if this doesn't cause problems when importing.
    dts: { vue: true },
    copy: ['README.md', { from: '../../LICENSE', to: 'dist/LICENSE' }]
});
