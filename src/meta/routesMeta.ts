import { svgFaviconDataUrl } from "../utils/favicon";

type Meta = { title: string; emoji: string; fav: string };

export const routesMeta: Record<string, Meta> = {
  "/": { title: "Home", emoji: "🏠", fav: svgFaviconDataUrl("H", "#1e88e5") },
  "/projects": {
    title: "Projects",
    emoji: "📁",
    fav: svgFaviconDataUrl("P", "#8e24aa"),
  },
  "/features": {
    title: "Features",
    emoji: "✨",
    fav: svgFaviconDataUrl("F", "#ef6c00"),
  },
  "/about": {
    title: "About",
    emoji: "👤",
    fav: svgFaviconDataUrl("A", "#2e7d32"),
  },
  "/login": {
    title: "Login",
    emoji: "🔐",
    fav: svgFaviconDataUrl("L", "#546e7a"),
  },
  "/register": {
    title: "Register",
    emoji: "📝",
    fav: svgFaviconDataUrl("R", "#ad1457"),
  },
  "/logout": {
    title: "Logout",
    emoji: "🚪",
    fav: svgFaviconDataUrl("O", "#6d4c41"),
  },
};

export const defaultMeta: Meta = {
  title: "Portfolio",
  emoji: "💼",
  fav: svgFaviconDataUrl("P", "#263238"),
};
