import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Registrar plugin para validar tipo de archivo
registerPlugin(FilePondPluginFileValidateType);

export const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleUpload = async () => {
    if (!files[0]) return alert("Por favor selecciona un archivo.");
    if (!supplierName) return alert("Debes ingresar el nombre del proveedor.");

    const formData = new FormData();
    formData.append("document", files[0].file);
    formData.append("supplierName", supplierName);

    setUploading(true);

    try {
      const res = await fetch("http://localhost:8080/api/supplier/table", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formData,
      });

      const text = await res.text();
      console.log("Respuesta cruda:", text);

      const data = text ? JSON.parse(text) : {};
      console.log("Respuesta como JSON:", data);

      setResponseMessage(
        res.ok
          ? "Archivo subido correctamente."
          : data.error || "Error al subir el archivo."
      );
    } catch (err) {
      console.error("Error al subir el archivo:", err.message);
      setResponseMessage("Ocurrió un error al subir el archivo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre del proveedor"
        value={supplierName}
        onChange={(e) => setSupplierName(e.target.value)}
      />

      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        name="document"
        labelIdle='Arrastra un archivo o <span class="filepond--label-action">explora</span>'
        acceptedFileTypes={[
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
          "application/vnd.ms-excel", // .xls
          "text/csv",
        ]}
      />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Subiendo..." : "Subir archivo"}
      </button>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};
