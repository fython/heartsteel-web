import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: "0.0.0.0",
  },
  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      injectRegister: "inline",
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "heartsteel-180px.png"],
      manifest: {
        name: "心之钢模拟器",
        short_name: "心之钢",
        description: "随时随地叠加你的心之钢",
        theme_color: "#f76f2a",
        background_color: "#000000",
        icons: [
          {
            src: "heartsteel-192px.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "heartsteel-512px.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
