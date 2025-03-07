import { Header, ProductAdder, Withdrawals } from "../../components";
import { WithdrawalDetail } from "../../components/Withdrawals/components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdderProvider } from "../../context";
import { ToastContainer } from "react-toastify";

export const Dashboard = () => {
  return (
    <section>
      <BrowserRouter>
        <AdderProvider>
          <Header />
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
