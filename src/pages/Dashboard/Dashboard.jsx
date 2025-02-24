import {
  Header,
  InventoryList,
  NavbarAdmin,
  ProductAdder,
  LowStockList,
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
            <Route path="/bajo-stock" element={<LowStockList />} />
          </Routes>
        </AdderProvider>
      </BrowserRouter>
    </section>
  );
};
