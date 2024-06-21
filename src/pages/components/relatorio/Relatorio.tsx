import { Document, Page } from "@react-pdf/renderer";
import Header from "./Header";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { parseIdSaToOriginalFormat } from "../../../lib/utils";
import Lote from "./Lote";

interface RelatorioProps {
  idSa: string;
}

const Relatorio: FC<RelatorioProps> = ({ idSa }) => {
  const [lotes, setLotes] = useState<ILote[]>();

  useEffect(() => {
    fetchLotes();
  }, []);

  const fetchLotes = async () => {
    const { data } = await axios.get<ILote[]>(
      `https://uno-api-pdre.onrender.com/api/v1/lote/solicitacao-analise?idSa=${parseIdSaToOriginalFormat(
        idSa!
      )}`
    );
    console.log(data);
    setLotes(data);
  };

  return (
    <Document>
      <Page
        size="A4"
        style={{
          minHeight: "100vh",

          marginTop: "3cm",
          marginBottom: "2cm",
          paddingRight: "2cm",
        }}
      >
        <Header idSa={idSa} />

        {lotes?.map((lote) => (
          <Lote lote={lote} key={lote.id} />
        ))}
      </Page>
    </Document>
  );
};

export default Relatorio;
