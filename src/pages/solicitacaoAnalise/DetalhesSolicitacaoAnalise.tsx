import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { cn, parseIdSaToOriginalFormat } from "../../lib/utils";
import { Label } from "../../components/ui/label";
import { DataTable } from "../components/table/DataTable";
import { loteTableColumns } from "../components/table/ColumnsDefinition";
import CadastrarLote from "./components/CadastrarLote";
import FinalizarSolicitacaoAnalise from "./components/FinalizarSolicitacaoAnalise";
import { buttonVariants } from "../../components/ui/button";

const DetalhesSolicitacaoAnalise = () => {
  const [solicitacaoAnalise, setSolicitacaoAnalise] =
    useState<ISolicitacaoAnalise>();
  const [lotes, setLotes] = useState<ILote[]>();
  const [isLoteDialogOpen, setIsLoteDialogOpen] = useState(false);
  const [isFinalizarDialogOpen, setIsFinalizarDialogOpen] = useState(false);
  const { idSa } = useParams();

  useEffect(() => {
    fetchSolicitacaoAnalise();
    fetchLotes();
  }, []);

  const fetchSolicitacaoAnalise = async () => {
    const { data } = await axios.get<ISolicitacaoAnalise>(
      `https://uno-api-pdre.onrender.com/api/v1/solicitacao-analise?id_sa=${parseIdSaToOriginalFormat(
        idSa!
      )}`
    );

    setSolicitacaoAnalise(data);
  };

  const fetchLotes = async () => {
    const { data } = await axios.get<ILote[]>(
      `https://uno-api-pdre.onrender.com/api/v1/lote/solicitacao-analise?idSa=${parseIdSaToOriginalFormat(
        idSa!
      )}`
    );

    setLotes(data);
  };

  return (
    solicitacaoAnalise &&
    lotes && (
      <div className="container max-w-screen-2xl py-10">
        <Heading
          title="Detalhes da Solicitação de Análise"
          description="Mais detalhes sobre o projeto e seus lotes"
        />

        <div className="flex justify-between">
          <div className="w-1/2 grid grid-cols-2 py-8 gap-6">
            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                Id Solicitação de Análise
              </Label>
              <p className="text-xs text-zinc-600">{solicitacaoAnalise.idSa}</p>
            </div>

            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                CNPJ do Solicitante
              </Label>
              <p className="text-xs text-zinc-600">
                {solicitacaoAnalise.solicitante.cnpj}
              </p>
            </div>

            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                Solicitante
              </Label>
              <p className="text-xs text-zinc-600">
                {solicitacaoAnalise.solicitante.nome}
              </p>
            </div>

            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                Nome do Projeto
              </Label>
              <p className="text-xs text-zinc-600">
                {solicitacaoAnalise.nomeProjeto}
              </p>
            </div>

            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                Tipo de Análise
              </Label>
              <p className="text-xs text-zinc-600">
                {solicitacaoAnalise.tipoAnalise}
              </p>
            </div>

            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                Prazo Acordado
              </Label>
              <p className="text-xs text-zinc-600">
                {solicitacaoAnalise.prazoAcordado}
              </p>
            </div>

            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                Data de Conclusão
              </Label>
              <p className="text-xs text-zinc-600">
                {solicitacaoAnalise.conclusaoProjeto
                  ? solicitacaoAnalise.conclusaoProjeto
                  : "Não Finalizado"}
              </p>
            </div>

            <div>
              <Label className="text-sm text-zinc-800 font-bold">
                Descrição do Projeto
              </Label>
              <p className="text-xs text-zinc-600">
                {solicitacaoAnalise.descricaoProjeto}
              </p>
            </div>
          </div>

          <FinalizarSolicitacaoAnalise
            isOpen={isFinalizarDialogOpen}
            setIsOpen={setIsFinalizarDialogOpen}
            solicitacaoAnalise={solicitacaoAnalise}
            fetchSolicitacaoAnalise={fetchSolicitacaoAnalise}
          />

          <Link
            to={`/relatorio/${idSa}`}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "mt-8"
            )}
          >
            Gerar Relatório
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <Heading title="Lotes" />
          <CadastrarLote
            idSa={parseIdSaToOriginalFormat(idSa!)}
            fetchLotes={fetchLotes}
            isOpen={isLoteDialogOpen}
            setIsOpen={setIsLoteDialogOpen}
          />
        </div>
        <DataTable
          columns={loteTableColumns}
          data={lotes}
          filterColumn="amostra"
          filterPlaceholder="Nome da amostra"
        />
      </div>
    )
  );
};

export default DetalhesSolicitacaoAnalise;
