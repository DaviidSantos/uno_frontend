import { useEffect, useState } from "react";

import Heading from "../../components/Heading";
import axios from "axios";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [frequenciasTipoAnalise, setFrequenciasTipoAnalise] = useState<{
    labels: string[];
    datasets: {
      label: string;
      backgroundColor: string[];
      data: number[];
      hoverOffset: number;
    }[];
  }>();
  const [
    solicitacoesFinalizadasXAndamento,
    setSolicitacoesFinalizadasXAndamento,
  ] = useState<{
    labels: string[];
    datasets: {
      label: string;
      backgroundColor: string[];
      data: number[];
      hoverOffset: number;
    }[];
  }>();
  useEffect(() => {
    getTipoAnaliseHistogram();
    getProgressoSolicitacoesAnalise();
  }, []);

  const fetchSolicitacoesAnalise = async () => {
    const { data } = await axios.get<ISolicitacaoAnalise[]>(
      "https://uno-api-pdre.onrender.com/api/v1/solicitacao-analise/listagem"
    );

    return data;
  };

  const getTipoAnaliseHistogram = async () => {
    const hist = new Map<string, number>();
    const data = await fetchSolicitacoesAnalise();
    data.forEach((solicitacaoAnalise) => {
      if (hist.has(solicitacaoAnalise.tipoAnalise)) {
        hist.set(
          solicitacaoAnalise.tipoAnalise,
          hist.get(solicitacaoAnalise.tipoAnalise)! + 1
        );
      } else {
        hist.set(solicitacaoAnalise.tipoAnalise, 1);
      }
    });

    const labels = Array.from(hist.keys());
    const values = Array.from(hist.values());

    setFrequenciasTipoAnalise({
      labels,
      datasets: [
        {
          label: "Tipos de Análise mais solicitados",
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
          data: values,
          hoverOffset: 4,
        },
      ],
    });
  };

  const getProgressoSolicitacoesAnalise = async () => {
    const hist = new Map<string, number>();
    const data = await fetchSolicitacoesAnalise();
    data.forEach((solicitacaoAnalise) => {
      const status: boolean = !!solicitacaoAnalise.conclusaoProjeto;

      if (status) {
        if (hist.has("Concluído")) {
          hist.set("Concluído", hist.get("Concluído")! + 1);
        } else {
          hist.set("Concluído", 1);
        }
      } else {
        if (hist.has("Em Andamento")) {
          hist.set("Em Andamento", hist.get("Em Andamento")! + 1);
        } else {
          hist.set("Em Andamento", 1);
        }
      }
    });

    const labels = Array.from(hist.keys());
    const values = Array.from(hist.values());

    setSolicitacoesFinalizadasXAndamento({
      labels,
      datasets: [
        {
          label: "Solicitações em Andamento x Concluído",
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
            "rgb(201, 203, 207)",
            "rgb(54, 162, 235)",
          ],
          data: values,
          hoverOffset: 4,
        },
      ],
    });
  };

  return (
    frequenciasTipoAnalise &&
    solicitacoesFinalizadasXAndamento && (
      <div className="container max-w-screen-2xl py-10">
        <Heading title="Dashboard" />

        <div className="flex gap-96 py-8">
          <div className="w-96">
            <h2 className="text-center text-xl font-black pb-4">
              Tipos de análise mais solicitadas
            </h2>
            <Pie data={frequenciasTipoAnalise} options={{}} key={1} />
          </div>

          <div className="w-96">
            <h2 className="text-center text-xl font-black pb-4">
              Progresso das Solicitações de Análise
            </h2>
            <Pie
              data={solicitacoesFinalizadasXAndamento}
              options={{}}
              key={2}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
