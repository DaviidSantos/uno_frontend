import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface AnaliseProps {
  analise: IAnalise;
}

const Analise: FC<AnaliseProps> = ({ analise }) => {
  return (
    <View
      style={{
        marginTop: "0.5cm",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: "10px" }}>{analise.id}</Text>
      <Text style={{ fontSize: "10px" }}>{analise.ensaio.nome}</Text>
      <Text style={{ fontSize: "10px" }}>
        {analise.especificacao + analise.unidade}
      </Text>
      <Text style={{ fontSize: "10px" }}>
        {analise.resultado + analise.unidade}
      </Text>
    </View>
  );
};

export default Analise;
