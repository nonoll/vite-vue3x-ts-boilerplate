import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, '.');
  console.log('env', env);

  return defineConfig({
    plugins: [vue()]
  });
}
