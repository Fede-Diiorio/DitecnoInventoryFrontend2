import {
  Header,
  NavbarAdmin,
  NavbarUser,
  ProductAdder,
  Withdrawals,
  Orders,
  OrderDetail,
  CustomDataTable,
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
          element={
            <CustomDataTable
              fetchFunction={getInventory}
              showPagination={true}
              showSearchBar={false}
            />
          }
        />
        <Route
          path="/bajo-stock"
          element={
            <CustomDataTable
              fetchFunction={getProductsWithLowStock}
              showPagination={true}
              showSearchBar={false}
            />
          }
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
