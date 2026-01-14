// src/components/AuthRehydrate.tsx
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { clearError } from "../redux/slices/authSlice";

export default function AuthRehydrate() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // يمكن استخدامه لتنظيف الأخطاء عند بداية التشغيل
    dispatch(clearError());
  }, [dispatch]);
  return null;
}
