import classes from "./Withdrawals.module.scss";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { useAsync } from "../../hooks";
import { getAllWithdrawals } from "../../services";

export const Withdrawals = () => {
  const { data: withdrawals, loading, error } = useAsync(getAllWithdrawals);

  if (loading) return <h3>Cargando...</h3>;

  if (error) return <h3>Acceso denegado</h3>;

  return <ItemContainer items={withdrawals} />;
};
