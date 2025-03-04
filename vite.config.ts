import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    port: 3000,
  },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //     "@utils": path.resolve(__dirname, "./src/utils"),
  //     "@components": path.resolve(__dirname, "./src/components"),
  //     "@hooks": path.resolve(__dirname, "./src/hooks"),
  //     "@features": path.resolve(__dirname, "./src/features"),
  //     "@data": path.resolve(__dirname, "./src/data"),
  //     "@context": path.resolve(__dirname, "./src/context"),
  //   },
  // },
  build: {
    outDir: "dist",
  },
  base: "/",
});
