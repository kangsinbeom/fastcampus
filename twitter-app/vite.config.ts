import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      firebaseApp: "/src/firebaseApp",
      utils: "/src/utils",
      hooks: "/src/hooks",
      contexts: "/src/contexts",
      apis: "/src/apis",
    },
  },
});
