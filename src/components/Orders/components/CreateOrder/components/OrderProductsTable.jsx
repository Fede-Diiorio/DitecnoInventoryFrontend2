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
}) => {
  const [exchangeRate, setExchangeRate] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [nestedDiscount, setNestedDiscount] = useState(0);

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
          <div className={classes.inputsRow}>
            <label>
              Tipo de cambio:
              <input
                type="number"
                step="1"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseInt(e.target.value) || 1)}
              />
            </label>
            <label>
              Descuento:
              <input
                type="number"
                step="1"
                value={discount}
                onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
              />
            </label>
            <label>
              Descuento anidado:
              <input
                type="number"
                step="1"
                value={nestedDiscount}
                onChange={(e) =>
                  setNestedDiscount(parseInt(e.target.value) || 0)
                }
              />
            </label>
          </div>
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
