import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { DataTable } from "../components/table/DataTable";
import { analiseTableColumns } from "../components/table/ColumnsDefinition";
import CadastrarAnalise from "./components/CadastrarAnalise";

const DetalhesLote = () => {
  const [lote, setLote] = useState<ILote>();
  const [analises, setAnalises] = useState<IAnalise[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { idLote } = useParams();

  useEffect(() => {
    fetchLote();
    fetchAnalises();
  }, []);

  const fetchLote = async () => {
    const { data } = await axios.get<ILote>(
      `https://uno-api-pdre.onrender.com/api/v1/lote/${idLote}`
    );

    setLote(data);
  };

  const fetchAnalises = async () => {
    const { data } = await axios.get<IAnalise[]>(
      `https://uno-api-pdre.onrender.com/api/v1/analise/${idLote}`
    );
    console.log(
      await axios.get<IAnalise[]>(
        `https://uno-api-pdre.onrender.com/api/v1/analise/${idLote}`
      )
    );

    setAnalises(data);
  };

  return (
    lote &&
    analises && (
      <div className="container max-w-screen-2xl py-10">
        <Heading
          title="Lote"
          description="Abaixo estão detalhados as informações do lote e as ánalises efetuadas em suas amostras"
        />

        <div className="w-1/2 grid grid-cols-2 py-8 gap-6">
          <div>
            <Label className="text-sm text-zinc-800 font-bold">
              Id Solicitação de Análise
            </Label>
            <p className="text-xs text-zinc-600">
              {lote.solicitacaoAnalise.idSa}
            </p>
          </div>

          <div>
            <Label className="text-sm text-zinc-800 font-bold">
              Nome do Projeto
            </Label>
            <p className="text-xs text-zinc-600">
              {lote.solicitacaoAnalise.nomeProjeto}
            </p>
          </div>

          <div>
            <Label className="text-sm text-zinc-800 font-bold">Amostra</Label>
            <p className="text-xs text-zinc-600">{lote.amostra}</p>
          </div>

          <div>
            <Label className="text-sm text-zinc-800 font-bold">
              Nota Fiscal
            </Label>
            <p className="text-xs text-zinc-600">{lote.notaFiscal}</p>
          </div>

          <div>
            <Label className="text-sm text-zinc-800 font-bold">
              Data de Entrada
            </Label>
            <p className="text-xs text-zinc-600">{lote.dataEntrada}</p>
          </div>

          <div>
            <Label className="text-sm text-zinc-800 font-bold">
              Data de Validade
            </Label>
            <p className="text-xs text-zinc-600">{lote.dataValidade}</p>
          </div>

          <div>
            <Label className="text-sm text-zinc-800 font-bold">
              Quantidade
            </Label>
            <p className="text-xs text-zinc-600">{lote.quantidade}</p>
          </div>

          <div>
            <Label className="text-sm text-zinc-800 font-bold">Descrição</Label>
            <p className="text-xs text-zinc-600">
              {lote.descricao === "" ? "-" : lote.descricao}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Heading title="Analises" />
          <CadastrarAnalise
            fetchAnalises={fetchAnalises}
            fetchLote={fetchLote}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            lote={idLote!}
          />
        </div>
        <DataTable
          columns={analiseTableColumns}
          data={analises}
          filterColumn="lote.amostra"
          filterPlaceholder="Nome da amostra"
        />
      </div>
    )
  );
};

export default DetalhesLote;
