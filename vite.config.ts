import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css}', 'index.html'],
      },
      manifest: {
        "name": "final-frontend",
        "short_name": "final-frontend",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#696666",
        "lang": "ru",
        "scope": "/",
        "theme_color": "#2e2e2e",
        "id": "habits-manager",
        "description": "Habits manager",
        "orientation": "portrait-primary",
        "icons": [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'  
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      components: "/src/components",
      hooks: "/src/shared/hooks",
      layouts: "/src/shared/layouts",
      pages: "/src/pages",
      app: "/src/app",
      widgets: "/src/widgets",
      actions: "/src/shared/actions",
      src: "/src",
    },
  },
});
