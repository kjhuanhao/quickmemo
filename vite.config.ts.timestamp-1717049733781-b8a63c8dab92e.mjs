// Users/macos/Desktop/code/monster/quickmemo/vite.config.ts
import { defineConfig } from "file:///Users/macos/Desktop/code/monster/quickmemo/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.9_sass@1.76.0/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///Users/macos/Desktop/code/monster/quickmemo/node_modules/.pnpm/tailwindcss@3.4.3/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/macos/Desktop/code/monster/quickmemo/node_modules/.pnpm/autoprefixer@10.4.19_postcss@8.4.38/node_modules/autoprefixer/lib/autoprefixer.js";
import react from "file:///Users/macos/Desktop/code/monster/quickmemo/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.2.11_@types+node@20.12.9_sass@1.76.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/macos/Desktop/code/monster/quickmemo";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  base: "./",
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src")
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  server: {}
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXNlcnMvbWFjb3MvRGVza3RvcC9jb2RlL21vbnN0ZXIvcXVpY2ttZW1vL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hY29zL0Rlc2t0b3AvY29kZS9tb25zdGVyL3F1aWNrbWVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21hY29zL0Rlc2t0b3AvY29kZS9tb25zdGVyL3F1aWNrbWVtby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFjb3MvRGVza3RvcC9jb2RlL21vbnN0ZXIvcXVpY2ttZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcydcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCdcbiAgfSxcbiAgYmFzZTogJy4vJyxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKVxuICAgIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW3RhaWx3aW5kY3NzLCBhdXRvcHJlZml4ZXJdXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyxvQkFBb0I7QUFDaFYsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsYUFBYSxZQUFZO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRLENBRVI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
