import {
  Header,
  NavbarAdmin,
  NavbarUser,
  ProductAdder,
  Withdrawals,
  Orders,
  OrderDetail,
  NewDeliveryNote,
  CreateOrder,
  Suppliers,
  Inventory,
  InventoryLowStock,
  WithdrawalDetail,
  PendingProducts,
  CompleteOrders,
  Restitutions,
  RestitutionDetail,
  UpdateProduct,
  CreateProduct,
  Users,
  UpdateSupplier,
  UpdateUser,
  NavbarMaster,
} from "../../components";
import { Routes, Route } from "react-router-dom";

export const Dashboard = {
  Admin: () => (
    <>
      <Header navBar={<NavbarAdmin />} />
      <Routes>
        <Route path="/" element={<ProductAdder />} />
        <Route path="/inventario" element={<Inventory />} />
        <Route path="/inventario/nuevo-producto" element={<CreateProduct />} />
        <Route path="/inventario/bajo-stock" element={<InventoryLowStock />} />
        <Route path="/inventario/:productId" element={<UpdateProduct />} />
        <Route path="/movimientos/retiros" element={<Withdrawals />} />
        <Route path="/movimientos/retiros/:id" element={<WithdrawalDetail />} />
        <Route path="/movimientos/reposiciones" element={<Restitutions />} />
        <Route
          path="/movimientos/reposiciones/:id"
          element={<RestitutionDetail />}
        />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/usuarios/:id" element={<UpdateUser />} />
        <Route path="/ordenes" element={<Orders />} />
        <Route path="/ordenes/pendientes" element={<PendingProducts />} />
        <Route path="/ordenes/completas" element={<CompleteOrders />} />
        <Route path="/ordenes/crear" element={<CreateOrder />} />
        <Route path="/ordenes/:id" element={<OrderDetail />} />
        <Route path="/remito" element={<NewDeliveryNote />} />
        <Route path="/proveedores" element={<Suppliers />} />
        <Route path="/proveedores/:supplierName" element={<UpdateSupplier />} />
      </Routes>
    </>
  ),

  Master: () => (
    <>
      <Header navBar={<NavbarMaster />} />
      <Routes>
        <Route path="/" element={<h3>Bienvenido</h3>} />
        <Route path="/inventario" element={<Inventory />} />
        <Route path="/inventario/nuevo-producto" element={<CreateProduct />} />
        <Route path="/inventario/bajo-stock" element={<InventoryLowStock />} />
        <Route path="/inventario/:productId" element={<UpdateProduct />} />
        <Route path="/movimientos/retiros" element={<Withdrawals />} />
        <Route path="/movimientos/retiros/:id" element={<WithdrawalDetail />} />
        <Route path="/movimientos/reposiciones" element={<Restitutions />} />
        <Route
          path="/movimientos/reposiciones/:id"
          element={<RestitutionDetail />}
        />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/usuarios/:id" element={<UpdateUser />} />
        <Route path="/proveedores" element={<Suppliers />} />
        <Route path="/proveedores/:supplierName" element={<UpdateSupplier />} />
      </Routes>
    </>
  ),

  User: () => (
    <>
      <Header navBar={<NavbarUser />} />
      <Routes>
        <Route path="/" element={<ProductAdder />} />
        <Route path="/inventario" element={<Inventory />} />
      </Routes>
    </>
  ),
};
