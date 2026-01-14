// src/services/auth.ts
import type { User } from "../redux/slices/authSlice";

export type Gender = User["gender"];

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  gender: Gender;
};

type StoredUser =
  | { username: string; email: string; gender: Gender; password: string }
  | {
      username: string;
      email: string;
      gender: Gender;
      passwordHash: string;
      salt: string;
    };

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

/* =========================
   Type Guards
   ========================= */
const isGender = (g: unknown): g is Gender =>
  g === "male" || g === "female" || g === "other";

const isStoredUser = (u: unknown): u is StoredUser => {
  if (typeof u !== "object" || u === null) return false;
  const obj = u as Record<string, unknown>;
  const hasBase =
    typeof obj.username === "string" &&
    typeof obj.email === "string" &&
    isGender(obj.gender);
  if (!hasBase) return false;

  const legacy = typeof obj.password === "string";
  const modern =
    typeof obj.passwordHash === "string" && typeof obj.salt === "string";
  return legacy || modern;
};

/* =========================
   Crypto Utils
   ========================= */
const toBase64 = (buf: ArrayBuffer): string => {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
};

const fromBase64ToArrayBuffer = (b64: string): ArrayBuffer => {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
};

async function pbkdf2(
  password: string,
  saltB64: string,
  iterations = 150_000
): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const saltBuf = fromBase64ToArrayBuffer(saltB64);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: saltBuf, iterations },
    keyMaterial,
    256
  );
  return toBase64(bits);
}

/* =========================
   Storage Helpers
   ========================= */
const loadUsers = (): StoredUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  const parsed: unknown = raw ? JSON.parse(raw) : [];
  return Array.isArray(parsed) ? parsed.filter(isStoredUser) : [];
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/* =========================
   Public API
   ========================= */

// ✅ تم تعديلها لإزالة any
export async function registerUser(data: RegisterData): Promise<User> {
  const users = loadUsers();

  // التحقق من وجود المستخدم مسبقاً
  if (
    users.some((u) => u.email === data.email || u.username === data.username)
  ) {
    throw new Error("المستخدم موجود بالفعل");
  }

  const salt = toBase64(crypto.getRandomValues(new Uint8Array(16)).buffer);
  const passwordHash = await pbkdf2(data.password, salt);

  // استخدام Destructuring لاستبعاد password وإنشاء كائن جديد نظيف
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userInfo } = data;

  const newUser: StoredUser = {
    ...userInfo,
    passwordHash,
    salt,
  };

  users.push(newUser);
  saveUsers(users);

  return { username: data.username, email: data.email, gender: data.gender };
}

export async function loginUser(id: string, pwdIn: string): Promise<User> {
  const users = loadUsers();
  const found = users.find(
    (u) =>
      u.username.toLowerCase() === id.toLowerCase() ||
      u.email.toLowerCase() === id.toLowerCase()
  );

  if (!found) throw new Error("بيانات الدخول غير صحيحة");

  if ("password" in found) {
    if (found.password !== pwdIn) throw new Error("كلمة السر خطأ");
  } else {
    const calc = await pbkdf2(pwdIn, found.salt);
    if (calc !== found.passwordHash) throw new Error("كلمة السر خطأ");
  }

  const publicUser: User = {
    username: found.username,
    email: found.email,
    gender: found.gender,
  };

  localStorage.setItem(CURRENT_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export const getCurrentUser = (): User | null => {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return null;
  }
};

export const logoutUser = () => localStorage.removeItem(CURRENT_KEY);
