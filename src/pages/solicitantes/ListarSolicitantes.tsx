import axios from "axios";
import { useState, useEffect } from "react";
import { DataTable } from "../components/DataTable";
import { solicitanteTableColumns } from "../components/table/ColumnsDefinition";

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
        <div className="py-2 border-b border-b-zinc-200 mb-8">
          <h1 className="text-3xl font-black text-zinc-800 tracking-tight">
            Solicitantes
          </h1>
          <p className="text-zinc-600 text-sm">
            Lista de todos os solicitantes cadastrados
          </p>
        </div>

        <DataTable columns={solicitanteTableColumns} data={solicitantes} filterPlaceholder="Filtrar por nome do cliente" filterColumn="nome" />
      </div>
    )
  );
};

export default ListarSolicitantes;
