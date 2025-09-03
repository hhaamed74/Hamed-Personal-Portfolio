import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/slices/authSlice";
import { getCurrentUser } from "../services/auth";

export default function AuthRehydrate() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const u = getCurrentUser();
    if (u) dispatch(login(u));
  }, [dispatch]);
  return null;
}
