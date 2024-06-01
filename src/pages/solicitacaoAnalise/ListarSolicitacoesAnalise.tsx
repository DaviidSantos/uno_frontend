import axios from "axios";
import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { DataTable } from "../components/table/DataTable";
import { solicitacaoAnaliseTableColumns } from "../components/table/ColumnsDefinition";

const ListarSolicitacoesAnalise = () => {
  const [solicitacoesAnalise, setSolicitacoesAnalise] = useState<ISolicitacaoAnalise[]>();

  useEffect(() => {
    fetchSolicitacoesAnalise();
  }, [])

  const fetchSolicitacoesAnalise = async () => {
    const { data } = await axios.get<ISolicitacaoAnalise[]>("https://uno-api-pdre.onrender.com/api/v1/solicitacao-analise/listagem");

    setSolicitacoesAnalise(data);
  }

  return (
    solicitacoesAnalise && <div className="container max-w-screen-2xl py-10">
      <Heading title="Solicitações de Análise" description="Lista dos projetos do laboratório" />

      <DataTable data={solicitacoesAnalise} columns={solicitacaoAnaliseTableColumns} filterPlaceholder="Nome do Projeto" filterColumn="nomeProjeto" />
    </div>
  )
}

export default ListarSolicitacoesAnalise;
