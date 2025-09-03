# Hamed – Personal Portfolio (React + TypeScript + MUI)

A fast, responsive portfolio built with **React**, **TypeScript**, **Vite**, and **Material UI v7**.  
It showcases projects, skills, an about page with certificates & a map, and includes simple client-side authentication, themes, and nice UX touches.

---

## ✨ Highlights

- **Modern stack**: React 18 + TypeScript + Vite + MUI 7
- **Responsive UI** with clean, accessible components
- **Theme system**
  - Light / Dark modes
  - **Preset themes**: **Default / Rose / Grape** (instant switch, persisted in `localStorage`)
- **Projects page**
  - Search, filter by tech, (optional) sort by date/popularity
  - Project **modal preview** + **Share** (Web Share API + clipboard fallback)
  - Tech chips with **consistent colors**
- **About page**
  - Bio + education timeline (schools & institute)
  - Certificates (Graduation + **MCIT**) with **view & download**
  - Embedded **Google Maps** (Alexandria address)
- **Auth (demo)**
  - Register / Login / Logout (stored in `localStorage`)
  - Passwords hashed with **PBKDF2** + salt (auto-migrates legacy plaintext)
  - Protected routes: **/features**, **/privacy**, **/terms**
- **Navigation UX**: top **NProgress** bar on route changes
- **Footer** with social links (GitHub, LinkedIn, Facebook, WhatsApp) + **copy email**
- **404 page** with search, back button, and quick links
- **Small touches**: styled scrollbars, toasts, page `<title>` & favicon per route

> **Note:** Grids are implemented with **`<Box sx={{ display: 'grid' }}/>`** to keep the layout simple and avoid version-specific Grid APIs.

---

| Home                                | Projects                                    |
| ----------------------------------- | ------------------------------------------- |
| ![Home](public/screenshot-home.png) | ![Projects](public/screenshot-projects.png) |

| About                                 | 404                               |
| ------------------------------------- | --------------------------------- |
| ![About](public/screenshot-about.png) | ![404](public/screenshot-404.png) |

---

## 🧱 Project Structure

```text
src/
  assets/
    Hamed_AbdelMohsen.pdf
    mcit_certificate.png
    graduation_certificate.jpg
  components/
    FeatureCard.tsx
    Footer.tsx
    Navbar.tsx
    ProjectCard.tsx
    RouteProgress.tsx
  context/
    ThemeContext.tsx          # Theme + presets (Default/Rose/Grape) + persistence
  hooks/
    usePageMeta.ts            # Sets title / favicon
    useProjects.ts            # Fetches projects.json + refetch
  meta/
    RequireAuth.tsx           # Guard for protected routes
  pages/
    About.tsx
    Features.tsx
    Home.tsx
    Login.tsx
    Logout.tsx
    NotFound.tsx
    Privacy.tsx
    Projects.tsx
    Register.tsx
    Terms.tsx
  redux/
    hooks.ts
    store.ts
    slices/
      authSlice.ts
  services/
    auth.ts                   # PBKDF2 + localStorage (register/login/logout)
    AuthRehydrate.tsx         # Loads current user on mount
  types/
    project.ts
App.tsx
main.tsx
```

Data lives in `public/projects.json`.

---

## 🗂️ `public/projects.json` (example)

```json
[
  {
    "id": "p1",
    "title": "Portfolio Site",
    "summary": "My personal portfolio built with React + MUI.",
    "cover": "/images/portfolio-cover.jpg",
    "tech": ["React", "TypeScript", "MUI", "Vite"],
    "liveUrl": "https://example.com",
    "repoUrl": "https://github.com/user/repo",
    "createdAt": "2024-12-01T00:00:00Z",
    "popularity": 7
  }
]
```

---

## 🧰 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** Material UI v7 (with custom presets: **Default / Rose / Grape**)
- **State:** Redux Toolkit (auth slice), React hooks
- **Routing:** React Router v6
- **UX:** NProgress, toasts/snackbars
- **Storage:** localStorage (demo auth), IndexedDB (via Dexie in examples)
- **Utilities:** Axios, i18next (optional), Framer Motion (optional)

---

## 🔧 Getting Started

### Prerequisites

- **Node.js ≥ 18**
- npm / pnpm / yarn

### Install

```bash
# npm
npm install
# or pnpm
pnpm install
# or yarn
yarn
```

### Run Dev

```bash
npm run dev
```

Vite will print a local URL (e.g. `http://localhost:5173`).

### Build & Preview

```bash
npm run build
npm run preview
```

---

## ⚙️ Configuration

### Theme & Mode (persisted)

- `localStorage["color-mode"]` → `"light"` or `"dark"`
- `localStorage["theme-preset"]` → `"default" | "rose" | "grape"`

### Auth Storage (demo only)

- Users: `localStorage["users"]`
- Current user: `localStorage["currentUser"]`

### NProgress

- Configured in `src/components/RouteProgress.tsx` and themed via MUI `GlobalStyles`

### Google Maps

- About page uses an iframe embed (no API key required). Replace the `src` for a different pin/address.

---

## 🔐 Protected Routes

The following routes require login (via `RequireAuth`):

- `/features`
- `/privacy`
- `/terms`

Use **Register** then **Login** to access them. (Client-side only — no real backend.)

---

## 🚀 Deploy

### Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Build command: `npm run build`
4. Output directory: `dist/`

### Netlify

- Build: `npm run build`
- Publish directory: `dist`
- Ensure SPA fallback: create `public/_redirects` containing:
  ```
  /*  /index.html  200
  ```

> If hosting elsewhere, enable **SPA routing** so unknown routes serve `index.html` (for React Router).

---

## 🧪 Tips

- For better Lighthouse scores: compress images, use `loading="lazy"`, and avoid oversized bundles.
- If you add new tech labels, extend the **tech color map** in `ProjectCard` so chips stay consistent.
- Prefer `<Box sx={{ display: 'grid' }}>` layouts for simple, version-proof grids.

---

## 🗺️ Roadmap

- Blog or case studies (MDX)
- Contact form with a mail provider
- Project tags + pagination
- Tests (Vitest) & linting (ESLint/Prettier)

---

## 📄 License

MIT — feel free to use and adapt.

---

## 👤 Author

**Hamed Abdel Mohsen El Sayed**  
Portfolio built with ❤️ using React, TypeScript, and MUI.
