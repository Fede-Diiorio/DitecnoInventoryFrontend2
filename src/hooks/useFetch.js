import { useState, useEffect } from "react";

export const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, controller);

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, ...dependencies]);

  return { data, loading, error };
};
