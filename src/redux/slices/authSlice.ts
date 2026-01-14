// src/redux/slices/authSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import * as authService from "../../services/auth";

/* =========================
   الأنواع (Types)
   ========================= */
export interface User {
  username: string;
  email: string;
  gender: "male" | "female" | "other";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

/* =========================
   العمليات (Async Thunks)
   ========================= */

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ id, pwd }: { id: string; pwd: string }, { rejectWithValue }) => {
    try {
      return await authService.loginUser(id, pwd);
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "خطأ غير معروف"
      );
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data: authService.RegisterData, { rejectWithValue }) => {
    try {
      return await authService.registerUser(data);
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "خطأ غير معروف"
      );
    }
  }
);

const initialState: AuthState = {
  user: authService.getCurrentUser(),
  isAuthenticated: !!authService.getCurrentUser(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      authService.logoutUser();
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
        // ✅ هنا استخدمنا PayloadAction عشان كده التحذير هيختفي
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        registerAsync.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
        }
      );
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
