import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "../components/table/DataTable";
import { reagenteAnaliseTableColumns } from "../components/table/ColumnsDefinition";
import CadastrarUsoReagente from "./components/CadastrarUsoReagente";

const DetalhesAnalise = () => {
  const [reagentesAnalise, setReagentesAnalise] =
    useState<IReagenteAnalise[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [analise] = useState<IAnalise>();
  const { id } = useParams();

  useEffect(() => {
    fetchReagentesAnalise();
    fetchAnalise();
  }, []);

  const fetchReagentesAnalise = async () => {
    const { data } = await axios<IReagenteAnalise[]>(
      `https://uno-api-pdre.onrender.com/api/v1/reagente-analise?analise=${id}`
    );

    setReagentesAnalise(data);
  };

  const fetchAnalise = async () => {
    const { data } = await axios<IReagenteAnalise[]>(
      `https://uno-api-pdre.onrender.com/api/v1/analise?analise=${id}`
    );

    setReagentesAnalise(data);
  };

  return (
    reagentesAnalise &&
    analise && (
      <div className="container max-w-screen-2xl py-10">
        <div className="flex items-center justify-center">
          <Heading
            title="Analise"
            description="Mais informações sobre a análise efetuada"
          />

          <CadastrarUsoReagente
            idAnalise={id!}
            idEstoque={analise.id}
            fetchReagentesAnalise={fetchReagentesAnalise}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
        </div>

        <DataTable
          columns={reagenteAnaliseTableColumns}
          data={reagentesAnalise}
          filterColumn="quantidade"
          filterPlaceholder="Quantidade utilizada"
        />
      </div>
    )
  );
};

export default DetalhesAnalise;
