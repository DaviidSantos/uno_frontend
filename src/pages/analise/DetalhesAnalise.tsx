import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataTable } from "../components/table/DataTable";
import { reagenteAnaliseTableColumns } from "../components/table/ColumnsDefinition";
import CadastrarUsoReagente from "./components/CadastrarUsoReagente";

const DetalhesAnalise = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reagentesAnalise, setReagentesAnalise] =
    useState<IReagenteAnalise[]>();
  const { id } = useParams();

  useEffect(() => {
    fetchReagenteAnalise();
  }, []);

  const fetchReagenteAnalise = async () => {
    const { data } = await axios.get(
      `https://uno-api-pdre.onrender.com/api/v1/reagente-analise?analise=${id}`
    );

    setReagentesAnalise(data);
  };

  return (
    reagentesAnalise && (
      <div className="container max-w-screen-2xl py-10">
        <div className="flex items-center justify-between">
          <Heading title="Reagentes utilizados na análise" />

          <CadastrarUsoReagente
            analiseId={id!}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            fetchReagenteAnalise={fetchReagenteAnalise}
          />
        </div>

        <DataTable
          columns={reagenteAnaliseTableColumns}
          data={reagentesAnalise}
          filterColumn="analise"
          filterPlaceholder="Id da Analise"
        />
      </div>
    )
  );
};

export default DetalhesAnalise;
