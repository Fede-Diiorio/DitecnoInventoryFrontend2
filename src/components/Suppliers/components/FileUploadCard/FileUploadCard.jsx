import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { updatePriceList, getAllSuppliers } from "../../../../services";
import { toast } from "react-toastify";
import { useFetch } from "../../../../hooks";
import { FlexContainerRow } from "../../../../styled-components";
import classes from "./FileUploadCard.module.scss";
import { useReload } from "../../../../context";

// Registrar plugin para validar tipo de archivo
registerPlugin(FilePondPluginFileValidateType);

export const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [uploading, setUploading] = useState(false);
  const { reloadFlag } = useReload();

  const {
    data: suppliers,
    loading,
    error,
  } = useFetch(getAllSuppliers, [reloadFlag]);

  const handleUpload = async () => {
    setUploading(true);

    try {
      const document = files[0]?.file;
      const result = await updatePriceList(supplierName, document);
      toast.success(result?.message || "Archivo subido correctamente.");
      setFiles([]);
      setSupplierName("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <h2>Cargando...</h2>;
  if (error) return <h2>Acceso denegado</h2>;

  return (
    <div className={classes.box}>
      <h4>Actualizar lista de precios:</h4>
      <FlexContainerRow>
        <div className={classes.buttonOptions}>
          <select
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          >
            <option value="">Selecciona un proveedor</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleUpload}
            disabled={uploading || !files[0] || !supplierName}
          >
            {uploading ? "Subiendo..." : "Subir archivo"}
          </button>
        </div>
      </FlexContainerRow>

      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        name="document"
        labelIdle='Arrastra un archivo o <span class="filepond--label-action">explora</span>'
        acceptedFileTypes={[
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
        ]}
      />
    </div>
  );
};
