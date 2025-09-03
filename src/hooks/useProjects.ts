import { useEffect, useMemo, useState } from "react";
import type { Project } from "../types/project";

type State = {
  data: Project[] | null;
  loading: boolean;
  error: string | null;
};

export function useProjects(url = "/projects.json") {
  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
  });

  // refetch trigger
  const [tick, setTick] = useState(0);

  // نكوّن URL فيه param يمنع الكاش عند كل refetch
  const requestUrl = useMemo(() => {
    try {
      const u = new URL(url, window.location.origin);
      // cache-buster
      u.searchParams.set("_", String(tick));
      return u.toString();
    } catch {
      // لو url نسبي جدًا، fallback بسيط
      const sep = url.includes("?") ? "&" : "?";
      return `${url}${sep}_=${tick}`;
    }
  }, [url, tick]);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        setState((s) => ({ ...s, loading: true, error: null }));
        const res = await fetch(requestUrl, {
          signal: ctrl.signal,
          // طلب مباشر بدون كاش من المتصفح (حتى لو الـ CDN مكاشِن، عندنا query param مختلف)
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed: ${res.status}`);
        }

        const json = (await res.json()) as Project[];
        setState({ data: json, loading: false, error: null });
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        const message =
          e instanceof Error ? e.message : "Failed to load projects";
        setState({ data: null, loading: false, error: message });
      }
    })();

    return () => ctrl.abort();
  }, [requestUrl]);

  const refetch = () => setTick((v) => v + 1);

  return {
    data: state.data ?? [],
    loading: state.loading,
    error: state.error,
    refetch,
  };
}
