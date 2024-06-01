import axios from "axios";
import { useState, useEffect } from "react";
import { DataTable } from "../components/table/DataTable";
import { solicitanteTableColumns } from "../components/table/ColumnsDefinition";
import Heading from "../../components/Heading";

const ListarSolicitantes = () => {
  const [solicitantes, setSolicitantes] = useState<ISolicitante[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchSolicitantes();
  }, []);

  const fetchSolicitantes = async () => {
    const { data } = await axios.get<ISolicitante[]>(
      "https://uno-api-pdre.onrender.com/api/v1/solicitante/listagem"
    );

    setSolicitantes(data);
  };

  return (
    solicitantes && (
      <div className="container max-w-screen-2xl py-10">
        <Heading title="Solicitantes" description="Lista de todos os solicitantes cadastrados" />

        <DataTable columns={solicitanteTableColumns} data={solicitantes} filterPlaceholder="Filtrar por nome do cliente" filterColumn="nome" />
      </div>
    )
  );
};

export default ListarSolicitantes;
