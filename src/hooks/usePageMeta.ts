import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routesMeta, defaultMeta } from "../meta/routesMeta";

export default function usePageMeta(siteName = "Hamed") {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routesMeta[pathname] ?? defaultMeta;

    document.title = `${meta.emoji} ${meta.title} | ${siteName}`;

    const ensureFavicon = (href: string) => {
      let link =
        document.querySelector<HTMLLinkElement>("link[rel='icon']") ??
        document.querySelector<HTMLLinkElement>("link[rel='shortcut icon']");

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = href;
    };

    ensureFavicon(meta.fav);
  }, [pathname, siteName]);
}
