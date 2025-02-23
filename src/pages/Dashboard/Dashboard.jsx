import { Header, InventoryList, NavbarAdmin } from "../../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Dashboard = () => {
  return (
    <section>
      <BrowserRouter>
        <Header navBar={<NavbarAdmin />} />
        <Routes>
          <Route path="/inventario" element={<InventoryList />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};
