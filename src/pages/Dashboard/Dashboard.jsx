import {
  Header,
  InventoryList,
  NavbarAdmin,
  NavbarUser,
  ProductAdder,
  LowStockList,
  Withdrawals,
} from "../../components";
import { WithdrawalDetail } from "../../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdderProvider, AuthContext } from "../../context";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const handleNavbar = user.role === "admin" ? <NavbarAdmin /> : <NavbarUser />;

  return (
    <section>
      <BrowserRouter>
        <AdderProvider>
          <Header navBar={handleNavbar} />
          <Routes>
            <Route path="/" element={<ProductAdder />} />
            <Route path="/inventario" element={<InventoryList />} />
            <Route path="/bajo-stock" element={<LowStockList />} />
            <Route path="/retiros" element={<Withdrawals />} />
            <Route path="/retiros/:id" element={<WithdrawalDetail />} />
          </Routes>
        </AdderProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </section>
  );
};
