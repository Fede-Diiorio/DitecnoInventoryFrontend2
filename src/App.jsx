import { useFetch } from "./hooks/useFetch";

function App() {
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/products"
  );

  if (loading) {
    return <h3>Cargando...</h3>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default App;
