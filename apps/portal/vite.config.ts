import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { existsSync } from 'fs'
import { resolve } from 'path'

const resolveTheme = (path: string) => {
    const themeFile = resolve(__dirname, `./src/theme/kwai${path}`)
    // When the theme file exists, use it
    if ( existsSync(themeFile)) {
        console.log(`${path} resolved to the theme file ${themeFile}`)
        return themeFile
    }
    // Otherwise use the default
    const original = resolve(__dirname, `./src${path}`)
    console.log(`No theme file found for ${path}, fallback on ${original}`);
    return original
}

export default defineConfig({
    server:  {
        port: 3001
    },
    plugins: [
        vue()
    ],
    resolve: {
        alias: [
            {
                find: '@theme',
                replacement: '',
                customResolver: resolveTheme
            }
        ]
    }
})
