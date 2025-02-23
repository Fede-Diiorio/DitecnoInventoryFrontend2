import { Header, InventoryList, NavbarAdmin } from "../../components";

export const Dashboard = () => {
  return (
    <section>
      <Header navBar={<NavbarAdmin />} />
      <InventoryList />
    </section>
  );
};
