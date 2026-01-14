// src/meta/routesMeta.ts

export interface PageMeta {
  title: string;
  fav: string;
}

export const defaultMeta: PageMeta = {
  title: "Portfolio",
  fav: "https://cdn-icons-png.flaticon.com/512/1207/1207257.png",
};

export const routesMeta: Record<string, PageMeta> = {
  "/": {
    title: "Home",
    fav: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
  },
  "/about": {
    title: "About Me",
    fav: "https://cdn-icons-png.flaticon.com/512/3220/3220315.png",
  },
  "/projects": {
    title: "My Projects",
    fav: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png",
  },
  "/skills": {
    title: "Technical Skills",
    fav: "https://cdn-icons-png.flaticon.com/512/1162/1162456.png",
  },
  "/contact": {
    title: "Contact Me",
    fav: "https://cdn-icons-png.flaticon.com/512/2099/2099199.png",
  },
  // ✅ الصفحات الجديدة اللي طلبتها
  "/login": {
    title: "Login",
    fav: "https://cdn-icons-png.flaticon.com/512/295/295128.png",
  },
  "/register": {
    title: "Create Account",
    fav: "https://cdn-icons-png.flaticon.com/512/748/748137.png",
  },
  "/features": {
    title: "Features",
    fav: "https://cdn-icons-png.flaticon.com/512/1067/1067555.png",
  },
  "/logout": {
    title: "Logging Out...",
    fav: "https://cdn-icons-png.flaticon.com/512/1828/1828479.png",
  },
  "/terms": {
    title: "Terms of Service",
    fav: "https://cdn-icons-png.flaticon.com/512/3503/3503827.png",
  },
  "/privacy": {
    title: "Privacy Policy",
    fav: "https://cdn-icons-png.flaticon.com/512/2569/2569174.png",
  },
};
