// src/components/RouteProgress.tsx
import NProgress, { type NProgressOptions } from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalStyles, useTheme } from "@mui/material";

const npOpts: Partial<NProgressOptions> = {
  showSpinner: false,
  trickle: true,
  trickleSpeed: 120,
  minimum: 0.15,
};
NProgress.configure(npOpts);

export default function RouteProgress() {
  const { pathname, search } = useLocation();
  const theme = useTheme();

  useEffect(() => {
    // ابدأ فورًا عشان تتأكد إنه ظاهر (لو حابب رجّع التأخير بعد كده)
    NProgress.start();
    const doneTimer = setTimeout(() => NProgress.done(), 600);
    return () => {
      clearTimeout(doneTimer);
      NProgress.done();
    };
  }, [pathname, search]);

  return (
    <GlobalStyles
      styles={{
        "#nprogress": { pointerEvents: "none" },

        "#nprogress .bar": {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 3,
          background: theme.palette.primary.main,
          zIndex: theme.zIndex.appBar + 2,
          transform: "translateZ(0)",
        },

        "#nprogress .peg": {
          boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
          opacity: 1,
        },

        // لو فعلت showSpinner: true
        "#nprogress .spinner": {
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: theme.zIndex.appBar + 2,
        },
      }}
    />
  );
}
