import { configDefaults, defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    {
        extends: './vitest.config.ts',
        test: {
            name: 'unit',
            include: ['./**/*.test.ts'],
            exclude: [...configDefaults.exclude, './**/*.browser.test.ts']
        }
    },
    {
        extends: './vitest.config.ts',
        test: {
            name: 'browser',
            include: ['./**/*.browser.test.ts'],
            browser: {
                provider: 'playwright',
                enabled: true,
                headless: true,
                screenshotFailures: false,
                instances: [{ browser: 'chromium' }]
            }
        }
    }
]);
