import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useParams } from "react-router-dom";
import axios from "axios";
import { parseStringToCnpj } from "../../lib/utils";
import { Label } from "../../components/ui/label";
import { DataTable } from "../components/table/DataTable";
import { solicitacaoAnaliseTableColumns } from "../components/table/ColumnsDefinition";

const DetalhesSolicitante = () => {
  const [solicitacoesAnalise, setSolicitacoesAnalise] = useState<ISolicitacaoAnalise[]>();
  const [solicitante, setSolicitante] = useState<ISolicitante>();
  const { cnpj } = useParams();

  useEffect(() => {
    fetchSolicitante();
    fetchSolicitacoesAnalise();
  }, [])

  const fetchSolicitacoesAnalise = async () => {
    const { data } = await axios.get<ISolicitacaoAnalise[]>(`https://uno-api-pdre.onrender.com/api/v1/solicitacao-analise/solicitante?cnpj=${parseStringToCnpj(cnpj!)}`)
    setSolicitacoesAnalise(data);
  }

  const fetchSolicitante = async () => {
    const { data } = await axios.get<ISolicitante>(`https://uno-api-pdre.onrender.com/api/v1/solicitante?cnpj=${parseStringToCnpj(cnpj!)}`)
    setSolicitante(data);
  }

  return (
    solicitante && solicitacoesAnalise && <div className="container max-w-screen-2xl">
      <Heading title="Detalhes do Solicitante" description="Mais informações sobre o solicitante e seus projetos ativos abaixo" />

      <div className="w-1/2 grid grid-cols-2 py-8 gap-6">
        <div>
          <Label className="text-sm text-zinc-800 font-bold">CNPJ</Label>
          <p className="text-xs text-zinc-600">{solicitante.cnpj}</p>
        </div>

        <div>
          <Label className="text-sm text-zinc-800 font-bold">Nome Fantasia</Label>
          <p className="text-xs text-zinc-600">{solicitante.nome}</p>
        </div>

        <div>
          <Label className="text-sm text-zinc-800 font-bold">Telefone</Label>
          <p className="text-xs text-zinc-600">{solicitante.telefone}</p>
        </div>

        <div>
          <Label className="text-sm text-zinc-800 font-bold">Email</Label>
          <p className="text-xs text-zinc-600">{solicitante.email}</p>
        </div>

        <div>
          <Label className="text-sm text-zinc-800 font-bold">Endereço</Label>
          <p className="text-xs text-zinc-600">{solicitante.endereco}</p>
        </div>

        <div>
          <Label className="text-sm text-zinc-800 font-bold">Cidade</Label>
          <p className="text-xs text-zinc-600">{solicitante.cidade}</p>
        </div>

        <div>
          <Label className="text-sm text-zinc-800 font-bold">Estado</Label>
          <p className="text-xs text-zinc-600">{solicitante.estado}</p>
        </div>
      </div>

      <Heading title="Histórico de Projetos" />
      <DataTable columns={solicitacaoAnaliseTableColumns} data={solicitacoesAnalise} filterPlaceholder="Nome do Projeto" filterColumn="nomeProjeto" />
    </div>
  )
}

export default DetalhesSolicitante;
