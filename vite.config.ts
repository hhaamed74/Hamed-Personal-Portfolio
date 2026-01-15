import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. تقسيم المكتبات لملفات صغيرة عشان السرعة
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    // 2. رفع حد التحذير لـ 1000 كيلوبايت لضمان عدم ظهور رسائل مزعجة
    chunkSizeWarningLimit: 1000,
  },
});
