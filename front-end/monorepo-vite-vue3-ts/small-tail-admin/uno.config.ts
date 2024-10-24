import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno' // UnoCSS 的默认预设

export default defineConfig({
  // 配置 UnoCSS 预设
  presets: [
    // UnoCSS 的默认预设，该预设试图提供一种常见的实用程序优先框架的超集，包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等。
    presetUno({
      dark: 'class'
    }),
  ],
})
