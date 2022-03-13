import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss({
    presets: [
      presetUno(),
      // ...自定义预设
    ],
  })],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'arcoblue-6': '#505690',
        },
        javascriptEnabled: true,
      }
    }
  },
})
