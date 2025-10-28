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
            { text: 'Tags', link: '/tags' }
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
                text: 'Tags',
                link: '/tags',
                items: [
                    {
                        text: 'Input tags',
                        items: [
                            { text: 'Checkbox input', link: '/tags/inputs/checkbox-input' },
                            { text: 'File input', link: '/tags/inputs/file-input' },
                            { text: 'Number input', link: '/tags/inputs/number-input' },
                            { text: 'Password input', link: '/tags/inputs/password-input' },
                            { text: 'Radio input', link: '/tags/inputs/radio-input' },
                            { text: 'Text area', link: '/tags/inputs/text-area' },
                            { text: 'Text input', link: '/tags/inputs/text-input' }
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
