
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-popover'],
          api: ['axios']
        },
      },
    },
  },
  server: {
    port: 8080,
    open: true,
  },
  optimizeDeps: {
    include: ['axios']
  },
  // Self-contained TypeScript configuration without external references
  esbuild: {
    tsconfigRaw: JSON.stringify({
      compilerOptions: {
        target: "esnext",
        useDefineForClassFields: true,
        lib: ["DOM", "DOM.Iterable", "ESNext"],
        allowJs: false,
        skipLibCheck: true,
        esModuleInterop: false,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: "ESNext",
        moduleResolution: "Node",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: false,
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        jsx: "react-jsx",
        baseUrl: ".",
        paths: {
          "@/*": ["./src/*"]
        },
        composite: true
      },
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx", "vite.config.ts"],
      exclude: ["node_modules", "dist"],
      references: [{ path: "./tsconfig.node.custom.json" }]
    })
  }
}));
