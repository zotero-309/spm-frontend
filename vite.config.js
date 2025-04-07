import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('smart-') // Treat any "smart-*" tag as a custom element
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
  },


  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/*.spec.js'],
    coverage: {
      provider: 'v8',
      include:['src/views/Scheduler.vue']
    },
  },
});
