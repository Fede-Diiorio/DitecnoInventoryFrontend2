import {
  Header,
  InventoryList,
  NavbarAdmin,
  NavbarUser,
  ProductAdder,
  LowStockList,
  Withdrawals,
  Orders,
  OrderDetail,
} from "../../components";
import { WithdrawalDetail } from "../../components";
import { Routes, Route } from "react-router-dom";

export const Dashboard = {
  Admin: () => (
    <>
      <Header navBar={<NavbarAdmin />} />
      <Routes>
        <Route path="/" element={<ProductAdder />} />
        <Route path="/inventario" element={<InventoryList />} />
        <Route path="/bajo-stock" element={<LowStockList />} />
        <Route path="/retiros" element={<Withdrawals />} />
        <Route path="/retiros/:id" element={<WithdrawalDetail />} />
        <Route path="/ordenes" element={<Orders />} />
        <Route path="/ordenes/:id" element={<OrderDetail />} />
      </Routes>
    </>
  ),

  User: () => (
    <>
      <Header navBar={<NavbarUser />} />
      <Routes>
        <Route path="/" element={<ProductAdder />} />
        <Route path="/inventario" element={<InventoryList />} />
      </Routes>
    </>
  ),
};
