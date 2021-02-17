import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import yaml from '@rollup/plugin-yaml';
const { resolve } = require('path');

export default defineConfig({
    alias: {
      '/@theme': resolve(__dirname, './theme/kwai')
    },
    plugins: [
        vue(),
        yaml()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            }
        }
    }
});
