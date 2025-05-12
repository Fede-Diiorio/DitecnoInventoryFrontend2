// src/hooks/useReload.ts
import { useState, useCallback } from "react";

export const useReload = () => {
  const [reloadFlag, setReloadFlag] = useState(false);

  const reload = useCallback(() => {
    setReloadFlag((prev) => !prev);
  }, []);

  return { reloadFlag, reload };
};
