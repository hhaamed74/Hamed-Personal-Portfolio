// src/hooks/usePopularity.ts
import { useCallback, useMemo, useState } from "react";

const KEY = "project_views"; // { [id]: number }

type ViewsMap = Record<string, number>;

function load(): ViewsMap {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function save(map: ViewsMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export default function usePopularity() {
  const [views, setViews] = useState<ViewsMap>(() => load());

  const bump = useCallback((id: string) => {
    setViews((v) => {
      const next = { ...v, [id]: (v[id] ?? 0) + 1 };
      save(next);
      return next;
    });
  }, []);

  const setInitialIfMissing = useCallback((id: string, value: number) => {
    setViews((v) => {
      if (v[id] != null) return v;
      const next = { ...v, [id]: value };
      save(next);
      return next;
    });
  }, []);

  const get = useCallback((id: string) => views[id] ?? 0, [views]);

  const map = useMemo(() => views, [views]);

  return { map, get, bump, setInitialIfMissing };
}
