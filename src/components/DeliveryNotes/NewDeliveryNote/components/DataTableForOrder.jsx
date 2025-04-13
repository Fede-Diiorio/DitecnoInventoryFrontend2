import DataTable from "react-data-table-component";
import { Container } from "../../../../styled-components";
import { columns } from "../utilities/dataTableUtilities";
import { customStyles } from "../../../../utilities";
import { TableInputSearch } from "../../../../components";
import { useState, useEffect } from "react";
import { useAutoFocus } from "../../../../hooks";
import { toast } from "react-toastify";

export const DataTableForOrders = ({ data, onRowClick, onProductMatch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useAutoFocus();

  const filteredData = data.filter((product) =>
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Si hay un único producto que coincide, lo notificamos al padre
  useEffect(() => {
    if (searchTerm.trim() === "") return;

    if (filteredData.length === 1) {
      onProductMatch(filteredData[0]);
      setSearchTerm("");
    } else if (filteredData.length === 0) {
      toast.error("Ese producto no se encuentra en esta orden");
      setSearchTerm("");
    }
  }, [searchTerm]); //Solo cambia el texto de la barra de busqueda

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    inputRef.current?.focus();
  };

  return (
    <Container>
      <TableInputSearch
        onChange={handleSearchChange}
        placeholder="Buscar por código"
        value={searchTerm}
        ref={inputRef}
      />
      <section>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          noDataComponent="No hay nada por aquí"
          highlightOnHover
          dense
          onRowClicked={onRowClick}
        />
      </section>
    </Container>
  );
};
