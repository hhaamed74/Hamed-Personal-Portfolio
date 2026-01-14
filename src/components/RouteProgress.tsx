// src/components/RouteProgress.tsx
import NProgress, { type NProgressOptions } from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalStyles, useTheme, alpha } from "@mui/material";

const npOpts: Partial<NProgressOptions> = {
  showSpinner: false,
  trickle: true,
  trickleSpeed: 200, // أبطأ شوية عشان يدي إحساس بالنعومة
  minimum: 0.1,
};
NProgress.configure(npOpts);

export default function RouteProgress() {
  const { pathname, search } = useLocation();
  const theme = useTheme();

  useEffect(() => {
    NProgress.start();
    // تقليل وقت الـ timer لـ 400ms عشان الانتهاء يكون أسرع وأسلس
    const doneTimer = setTimeout(() => NProgress.done(), 400);

    return () => {
      clearTimeout(doneTimer);
      NProgress.done();
    };
  }, [pathname, search]);

  return (
    <GlobalStyles
      styles={{
        "#nprogress": {
          pointerEvents: "none",
        },

        "#nprogress .bar": {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 3, // سمك الشريط
          // إضافة تدرج لوني خفيف (Gradient) يخلي شكله أفخم
          background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          zIndex: theme.zIndex.appBar + 2000, // أعلى من أي عنصر آخر
          boxShadow: `0 1px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
        },

        "#nprogress .peg": {
          display: "block",
          position: "absolute",
          right: 0,
          width: 100,
          height: "100%",
          // توهج (Glow) أقوى في نهاية الشريط
          boxShadow: `0 0 15px ${theme.palette.primary.main}, 0 0 8px ${theme.palette.primary.main}`,
          opacity: 1,
          transform: "rotate(3deg) translate(0px, -4px)",
        },

        /* إخفاء شريط NProgress التقليدي لو فيه تعارض */
        ".nprogress-custom-parent": {
          overflow: "hidden",
          position: "relative",
        },
      }}
    />
  );
}
