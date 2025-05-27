import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  customStyles,
  columnsForCreateOrder,
  formatCurrency,
} from "../../../../../utilities";
import classes from "./OrderProductsTable.module.scss";

export const OrderProductsTable = ({
  products,
  onQuantityChange,
  onRemove,
  exchangeRate,
  discount,
  nestedDiscount,
}) => {
  // Total sin descuentos ni tipo de cambio
  const baseTotal = products.reduce(
    (acc, p) => acc + p.price * (p.quantityToLoad || 1),
    0
  );

  // Aplicar descuento simple y luego anidado, y luego el tipo de cambio
  const discountedTotalArs =
    baseTotal *
    (1 - discount / 100) *
    (1 - nestedDiscount / 100) *
    exchangeRate;

  const discountedTotal =
    baseTotal * (1 - discount / 100) * (1 - nestedDiscount / 100);

  return (
    <>
      {products.length > 0 && (
        <div className={classes.totalSection}>
          <div className={classes.totalInfo}>
            Total: {formatCurrency(discountedTotal)}
          </div>
          <div className={classes.totalInfo}>
            Total ARS: {formatCurrency(discountedTotalArs)}
          </div>
        </div>
      )}

      <DataTable
        data={products}
        columns={columnsForCreateOrder(onQuantityChange, onRemove)}
        noDataComponent="La orden no tiene productos"
        dense
        highlightOnHover
        customStyles={customStyles}
      />
    </>
  );
};
