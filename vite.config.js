import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import toml from '@fbraem/rollup-plugin-toml';
const { resolve } = require('path');

export default ({ mode }) => {
  const configFile = `config.${mode}.toml`;
  return defineConfig({
    resolve: {
      alias: {
        '/@theme': resolve(__dirname, './theme/kwai'),
        '/@config': resolve(__dirname, './src/config', configFile)
      }
    },
    plugins: [
      vue(),
      toml()
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          author: resolve(__dirname, 'author.html'),
          coach: resolve(__dirname, 'coach.html')
        }
      }
    }
  });
};
