import { Text, View } from "@react-pdf/renderer";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import Analise from "./Analise";

interface LoteProps {
  lote: ILote;
}

const Lote: FC<LoteProps> = ({ lote }) => {
  const [analises, setAnalises] = useState<IAnalise[]>([]);

  useEffect(() => {
    fetchAnalises();
  }, []);

  const fetchAnalises = async () => {
    const { data } = await axios.get<IAnalise[]>(
      `https://uno-api-pdre.onrender.com/api/v1/analise/${lote.id}`
    );

    setAnalises(data);
  };
  return (
    <View
      style={{
        marginLeft: "2cm",
        marginTop: "1cm",
        borderBottom: "1px solid #808080",
      }}
    >
      <Text style={{ fontSize: "16px" }}>{lote.amostra}</Text>

      <View
        style={{
          marginTop: "0.5cm",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: "10px" }}>Id Análise</Text>
        <Text style={{ fontSize: "10px", marginLeft: "7.4cm" }}>Ensaio</Text>
        <Text style={{ fontSize: "10px", marginLeft: "2cm" }}>
          Especificação
        </Text>
        <Text style={{ fontSize: "10px", marginLeft: "2cm" }}>Resultado</Text>
      </View>

      {analises.map((analise) => (
        <Analise analise={analise} key={analise.id} />
      ))}
    </View>
  );
};

export default Lote;
