import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import toml from '@fbraem/rollup-plugin-toml';
const { resolve } = require('path');

export default defineConfig({
    alias: {
      '/@theme': resolve(__dirname, './theme/kwai')
    },
    plugins: [
        vue(),
        toml()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            }
        }
    }
});
