// src/hooks/usePageMeta.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routesMeta, defaultMeta } from "../meta/routesMeta";

export default function usePageMeta(siteName = "Hamed") {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routesMeta[pathname] ?? defaultMeta;

    // ✅ التعديل هنا: شلنا meta.emoji عشان ما يظهرش حرف أو شكل جنب الأيقونة
    document.title = `${meta.title} | ${siteName}`;

    const updateFavicon = (favUrl: string) => {
      // حذف أي أيقونات قديمة تماماً
      const existingIcons = document.querySelectorAll("link[rel*='icon']");
      existingIcons.forEach((icon) => icon.remove());

      // إضافة الأيقونة الجديدة الوحيدة
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = favUrl;

      document.head.appendChild(link);
    };

    updateFavicon(meta.fav);
  }, [pathname, siteName]);
}
