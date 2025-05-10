import {
  Header,
  NavbarAdmin,
  NavbarUser,
  ProductAdder,
  Withdrawals,
  Orders,
  OrderDetail,
  CustomDataTable,
  NewDeliveryNote,
  CreateOrder,
  Suppliers,
  Inventory,
  InventoryLowStock,
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
        <Route path="/inventario" element={<Inventory />} />
        <Route path="/bajo-stock" element={<InventoryLowStock />} />
        <Route path="/retiros" element={<Withdrawals />} />
        <Route path="/retiros/:id" element={<WithdrawalDetail />} />
        <Route path="/ordenes" element={<Orders />} />
        <Route path="/ordenes/:id" element={<OrderDetail />} />
        <Route path="/remito" element={<NewDeliveryNote />} />
        <Route path="/ordenes/crear" element={<CreateOrder />} />
        <Route path="/proveedores" element={<Suppliers />} />
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
