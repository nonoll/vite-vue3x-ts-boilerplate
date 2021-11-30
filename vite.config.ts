import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// @see https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, '.');
  console.log('env', env);

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    build: {
      rollupOptions: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        output: {
          manualChunks: {
            'pages-index': [
              './src/views/Index.vue'
            ],
            'pages-home': [
              './src/views/Home.vue'
            ]
          }
        }
      },
    },
  });
}
