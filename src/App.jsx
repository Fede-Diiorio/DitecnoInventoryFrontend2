import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const jsonData = await response.json();

      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h3>Cargando...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
