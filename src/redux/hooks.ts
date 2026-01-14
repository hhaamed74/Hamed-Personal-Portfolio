import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
// ✅ تأكد أن المسارات دي صحيحة حسب تنظيم ملفاتك
import type { RootState, AppDispatch } from "./store";

// استخدامه بدل useDispatch العادي عشان يتعرف على الـ Thunks والـ Actions صح
export const useAppDispatch = () => useDispatch<AppDispatch>();

// استخدامه بدل useSelector العادي عشان يعطيك اقتراحات الـ State (user, auth, etc.)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
