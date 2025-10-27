import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'VueTags',
    description: 'HTML elements, but better',
    themeConfig: {
        search: {
            provider: 'local'
        },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Components', link: '/components' }
            // { text: 'Examples', link: '/examples' }
        ],

        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'What are VueTags?', link: '/introduction' },
                    { text: 'Getting Started', link: '/getting-started' }
                ]
            },
            {
                text: 'Components',
                link: '/components',
                items: [
                    {
                        text: 'Input elements',
                        items: [
                            { text: 'Checkbox input', link: '/components/inputs/checkbox-input' },
                            { text: 'File input', link: '/components/inputs/file-input' },
                            { text: 'Number input', link: '/components/inputs/number-input' },
                            { text: 'Password input', link: '/components/inputs/password-input' },
                            { text: 'Radio input', link: '/components/inputs/radio-input' },
                            { text: 'Text area', link: '/components/inputs/text-area' },
                            { text: 'Text input', link: '/components/inputs/text-input' }
                        ]
                    }
                    // { text: 'Dialog elements' }
                ]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuetags' }],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present VueTags'
        }
    }
});
