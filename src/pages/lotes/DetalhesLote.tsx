import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Label } from "../../components/ui/label";

const DetalhesLote = () => {
  const [lote, setLote] = useState<ILote>();
  const { idLote } = useParams();

  useEffect(() => {
    fetchLote();
  }, []);

  const fetchLote = async () => {
    const { data } = await axios.get<ILote>(
      `https://uno-api-pdre.onrender.com/api/v1/lote/${idLote}`
    );

    setLote(data);
  };

  return (
    lote && (
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

        <Heading title="Analises" />
      </div>
    )
  );
};

export default DetalhesLote;
