import { useEffect, useState } from "react";

export const useAsync = (asyncFunction) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await asyncFunction();
      setData(response);
    };

    fetch();
  }, [asyncFunction]);

  return data;
};
