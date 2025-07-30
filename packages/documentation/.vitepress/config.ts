import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Enhanced elements',
    description: 'HTML elements, but better',
    themeConfig: {
        search: {
            provider: 'local'
        },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Components', link: '/components' },
            { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'What are enhanced elements?', link: '/introduction' },
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
                            { text: 'Text input', link: '/components/inputs/text-input' },
                            { text: 'Text area', link: '/components/inputs/text-area' }
                        ]
                    }
                    // { text: 'Dialog elements' }
                ]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/michaelverschoof/enhanced-elements' }],

        footer: {
            message: 'Released with under the MIT License.',
            copyright: 'Copyright © 2025-present Michael Verschoof'
        }
    }
});
