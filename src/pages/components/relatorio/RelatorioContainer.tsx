import { PDFViewer } from "@react-pdf/renderer";
import Relatorio from "./Relatorio";
import { useParams } from "react-router-dom";

const RelatorioContainer = () => {
  const { idSa } = useParams();

  return (
    <PDFViewer style={{ minHeight: "100vh" }}>
      <Relatorio idSa={idSa!} />
    </PDFViewer>
  );
};

export default RelatorioContainer;
