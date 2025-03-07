import {
  Header,
  ProductAdder,
  Withdrawals,
  NavbarUser,
} from "../../../components";
import { WithdrawalDetail } from "../../../components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdderProvider } from "../../../context";
import { ToastContainer } from "react-toastify";

export const UserDashboard = () => {
  return (
    <section>
      <BrowserRouter>
        <AdderProvider>
          <Header navBar={<NavbarUser />} />
          <Routes>
            <Route path="/" element={<ProductAdder />} />
            <Route path="/retiros" element={<Withdrawals />} />
            <Route path="/retiros/:id" element={<WithdrawalDetail />} />
          </Routes>
        </AdderProvider>
      </BrowserRouter>
      <ToastContainer position="bottom-right" />
    </section>
  );
};
