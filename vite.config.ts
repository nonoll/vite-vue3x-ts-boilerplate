import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, '.');
  console.log('env', env);

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    }
  });
}
