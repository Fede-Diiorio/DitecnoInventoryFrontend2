import {
  Header,
  InventoryList,
  NavbarAdmin,
  ProductAdder,
} from "../../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdderProvider } from "../../context";

export const Dashboard = () => {
  return (
    <section>
      <BrowserRouter>
        <AdderProvider>
          <Header navBar={<NavbarAdmin />} />
          <Routes>
            <Route path="/" element={<ProductAdder />} />
            <Route path="/inventario" element={<InventoryList />} />
          </Routes>
        </AdderProvider>
      </BrowserRouter>
    </section>
  );
};
