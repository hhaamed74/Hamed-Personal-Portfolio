import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // هنا تقدر تضيف أي Slices تانية مستقبلاً (مثل products, theme, etc.)
  },
  // إعداد اختياري: بيمنع ظهور تحذيرات الـ Serializability لو استخدمت Date أو Map في الـ State
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== "production",
});

// ✅ أنواع ثابتة ومهمة جداً للـ TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
