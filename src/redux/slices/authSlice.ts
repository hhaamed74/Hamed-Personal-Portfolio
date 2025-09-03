// src/redux/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string;
  email: string;
  gender: "male" | "female" | "other";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const isUser = (u: any): u is User =>
  u &&
  typeof u.username === "string" &&
  typeof u.email === "string" &&
  (u.gender === "male" || u.gender === "female" || u.gender === "other");

const loadUser = (): User | null => {
  try {
    const raw = localStorage.getItem("currentUser");
    const parsed = raw ? JSON.parse(raw) : null;
    return isUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: loadUser(),
  isAuthenticated: !!loadUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setFromStorage: (state) => {
      const u = loadUser();
      state.user = u;
      state.isAuthenticated = !!u;
    },
  },
});

export const { login, logout, setFromStorage } = authSlice.actions;
export default authSlice.reducer;
