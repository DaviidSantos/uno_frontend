import { View, Text } from "@react-pdf/renderer";
import { FC, useEffect, useState } from "react";
import { parseIdSaToOriginalFormat } from "../../../lib/utils";
import axios from "axios";

interface HeaderProps {
  idSa: string;
}

const Header: FC<HeaderProps> = ({ idSa }) => {
  const [solicitacaoAnalise, setSolicitacaoAnalise] =
    useState<ISolicitacaoAnalise>();

  useEffect(() => {
    fetchSolicitacaoAnalise();
  }, []);

  const fetchSolicitacaoAnalise = async () => {
    const { data } = await axios.get<ISolicitacaoAnalise>(
      `https://uno-api-pdre.onrender.com/api/v1/solicitacao-analise?id_sa=${parseIdSaToOriginalFormat(
        idSa!
      )}`
    );

    setSolicitacaoAnalise(data);
  };

  return (
    <View>
      <Text
        style={{ fontSize: "16px", textAlign: "center", marginBottom: "1cm" }}
      >
        Relatorio de Análise
      </Text>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ marginLeft: "2cm" }}>
          <Text style={{ fontSize: "12px" }}>Solicitação de Análise:</Text>
          <Text style={{ fontSize: "12px" }}>
            {parseIdSaToOriginalFormat(idSa)}
          </Text>
        </View>

        <View style={{ marginLeft: "2cm" }}>
          <Text style={{ fontSize: "12px" }}>Tipo de Analise</Text>
          <Text style={{ fontSize: "12px" }}>
            {solicitacaoAnalise?.tipoAnalise}
          </Text>
        </View>

        <View style={{ marginLeft: "2cm" }}>
          <Text style={{ fontSize: "12px" }}>Nome do Projeto</Text>
          <Text style={{ fontSize: "12px" }}>
            {solicitacaoAnalise?.nomeProjeto}
          </Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "0.5cm",
          marginLeft: "2cm",
        }}
      >
        <View>
          <Text style={{ fontSize: "12px" }}>Solicitante:</Text>
          <Text style={{ fontSize: "12px" }}>
            {solicitacaoAnalise?.solicitante.nome}
          </Text>
        </View>

        <View style={{ marginLeft: "2.8cm" }}>
          <Text style={{ fontSize: "12px" }}>Prazo Acordado</Text>
          <Text style={{ fontSize: "12px" }}>
            {solicitacaoAnalise?.prazoAcordado}
          </Text>
        </View>

        <View style={{ marginLeft: "2cm" }}>
          <Text style={{ fontSize: "12px" }}>Data de Conclusão</Text>
          <Text style={{ fontSize: "12px" }}>
            {solicitacaoAnalise?.conclusaoProjeto}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
