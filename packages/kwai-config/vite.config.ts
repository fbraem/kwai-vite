import { defineConfig } from 'vite';
import toml from '@fbraem/rollup-plugin-toml';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    toml(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/config.toml'),
      name: '@kwai/config',
      fileName: (format) => { console.log(format); return `index.${format}.js`; },
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
