import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "components": "/src/components",
      "hooks": "/src/shared/hooks",
      "layouts": "/src/shared/layouts",
      "pages": "/src/pages",
      "app": "/src/app",
      "widgets": "/src/widgets",
      "actions": "/src/shared/actions",
    }
  }
})

