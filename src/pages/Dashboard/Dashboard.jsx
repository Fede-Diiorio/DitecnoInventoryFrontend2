import {
  Header,
  NavbarAdmin,
  NavbarUser,
  ProductAdder,
  Withdrawals,
  Orders,
  OrderDetail,
  InventoryView,
} from "../../components";
import { WithdrawalDetail } from "../../components";
import { Routes, Route } from "react-router-dom";
import { getInventory, getProductsWithLowStock } from "../../services";

export const Dashboard = {
  Admin: () => (
    <>
      <Header navBar={<NavbarAdmin />} />
      <Routes>
        <Route path="/" element={<ProductAdder />} />
        <Route
          path="/inventario"
          element={<InventoryView fetchFunction={getInventory} />}
        />
        <Route
          path="/bajo-stock"
          element={<InventoryView fetchFunction={getProductsWithLowStock} />}
        />
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
