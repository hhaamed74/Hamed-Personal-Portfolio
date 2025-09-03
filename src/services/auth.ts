import type { User } from "../redux/slices/authSlice";

type Gender = User["gender"];

type RegisterData = {
  username: string;
  email: string;
  password: string;
  gender: Gender;
};

/**
 * نقبل الشكلين:
 * - Legacy: فيه password نصّي
 * - New:    فيه passwordHash + salt (PBKDF2)
 */
type StoredUser =
  | {
      username: string;
      email: string;
      gender: Gender;
      password: string; // LEGACY
    }
  | {
      username: string;
      email: string;
      gender: Gender;
      passwordHash: string; // base64
      salt: string; // base64
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

const isUser = (u: unknown): u is User => {
  if (typeof u !== "object" || u === null) return false;
  const obj = u as Record<string, unknown>;
  return (
    typeof obj.username === "string" &&
    typeof obj.email === "string" &&
    isGender(obj.gender)
  );
};

/* =========================
   Storage helpers
   ========================= */
const loadUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredUser);
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
};

const saveCurrentUser = (user: User) => {
  try {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
};

/* =========================
   Base64 & Crypto utils
   ========================= */

// toBase64: من ArrayBuffer → base64 (ASCII-safe)
const toBase64 = (buf: ArrayBuffer): string => {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
};

// fromBase64: من base64 → ArrayBuffer
const fromBase64ToArrayBuffer = (b64: string): ArrayBuffer => {
  const bin = atob(b64);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer; // ✅ ArrayBuffer صريح
};

const enc = new TextEncoder();

// genSalt: يولّد ArrayBuffer ثم يخزّنه base64
const genSaltB64 = (bytes = 16): string => {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return toBase64(arr.buffer as ArrayBuffer);
};

// PBKDF2: نمرّر الملح كـ ArrayBuffer (مش Uint8Array) عشان يرضي BufferSource
async function pbkdf2(
  password: string,
  saltB64: string,
  iterations = 150_000,
  lengthBits = 256
): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password), // Uint8Array مسموح هنا
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const saltBuf: ArrayBuffer = fromBase64ToArrayBuffer(saltB64);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: saltBuf, iterations },
    keyMaterial,
    lengthBits
  );
  return toBase64(bits);
}

/* =========================
   Public API (async)
   ========================= */

export async function registerUser(data: RegisterData): Promise<User> {
  // sanitize + validate
  const username = (data.username ?? "").toString().trim();
  const email = (data.email ?? "").toString().trim();
  const password = (data.password ?? "").toString();

  if (!username) throw new Error("Username is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    throw new Error("Invalid email address");
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");
  if (!isGender(data.gender)) throw new Error("Invalid gender");

  const users = loadUsers();
  const exists = users.some(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() ||
      u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) throw new Error("Username or email already exists");

  // PBKDF2 + salt
  const salt = genSaltB64();
  const passwordHash = await pbkdf2(password, salt);

  const newUser: StoredUser = {
    username,
    email,
    gender: data.gender,
    passwordHash,
    salt,
  };

  users.push(newUser);
  saveUsers(users);

  const publicUser: User = { username, email, gender: newUser.gender };
  saveCurrentUser(publicUser);
  return publicUser;
}

export async function loginUser(
  identifier: string,
  passwordIn: string
): Promise<User> {
  const id = (identifier ?? "").toString().trim().toLowerCase();
  const pwd = (passwordIn ?? "").toString();

  const users = loadUsers();
  const idx = users.findIndex(
    (u) => u.username.toLowerCase() === id || u.email.toLowerCase() === id
  );
  const found = idx >= 0 ? users[idx] : undefined;

  if (!found) throw new Error("No account matches this username/email");

  // Legacy → migration
  if ("password" in found) {
    if (found.password !== pwd) throw new Error("Wrong password");

    const salt = genSaltB64();
    const passwordHash = await pbkdf2(pwd, salt);
    const migrated: StoredUser = {
      username: found.username,
      email: found.email,
      gender: found.gender,
      passwordHash,
      salt,
    };
    users[idx] = migrated;
    saveUsers(users);

    const publicUser: User = {
      username: migrated.username,
      email: migrated.email,
      gender: migrated.gender,
    };
    saveCurrentUser(publicUser);
    return publicUser;
  }

  // Modern: قارن الـ hash
  const calc = await pbkdf2(pwd, found.salt);
  if (calc !== found.passwordHash) throw new Error("Wrong password");

  const publicUser: User = {
    username: found.username,
    email: found.email,
    gender: found.gender,
  };
  saveCurrentUser(publicUser);
  return publicUser;
}

export function logoutUser() {
  try {
    localStorage.removeItem(CURRENT_KEY);
  } catch {
    // ignore
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
