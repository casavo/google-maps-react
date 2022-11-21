import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import path from "node:path"

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "google-maps-react",
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    }
  },
})
