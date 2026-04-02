import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./config"),
      "react-helmet-async": path.resolve(__dirname, "./src/vendor/react-helmet-async.tsx"),
    },
  },
  build: {
    target: "es2020",
    // Inline assets < 8KB as base64 (icons, small images)
    assetsInlineLimit: 8192,
    // Increase chunk size warning limit to 800KB
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split out large libraries into their own cached chunks
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-tooltip", "lucide-react"],
          "vendor-query": ["@tanstack/react-query"],
        },
        // Use content hashes for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? assetInfo.name ?? "";
          if (/\.(webp|jpg|jpeg|png|gif|svg)$/i.test(name)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.(woff2?|ttf|eot)$/i.test(name)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
}));
