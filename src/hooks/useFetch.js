import { useEffect, useState, useRef } from "react";

export const useFetch = (fetchFunction, deps = [], options = {}) => {
  const { refetchInterval, refetchCondition } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchFunction, ...deps]);

  useEffect(() => {
    if (refetchInterval && (!refetchCondition || refetchCondition(data))) {
      intervalRef.current = setInterval(fetchData, refetchInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetchInterval, data]);

  return { data, loading, error };
};
