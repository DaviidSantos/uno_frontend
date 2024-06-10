import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import axios from "axios";
import { DataTable } from "../components/table/DataTable";
import { estoqueTableColumns } from "../components/table/ColumnsDefinition";

const ListarEstoques = () => {
  const [estoques, setEstoques] = useState<IEstoque[]>();

  useEffect(() => {
    fetchEstoques();
  });

  const fetchEstoques = async () => {
    const { data } = await axios.get<IEstoque[]>(
      "https://uno-api-pdre.onrender.com/api/v1/estoque"
    );

    setEstoques(data);
  };

  return (
    estoques && (
      <div className="container max-w-screen-2xl py-10">
        <Heading
          title="Estoques"
          description="Lista dos estoques do laboratório"
        />

        <DataTable
          columns={estoqueTableColumns}
          data={estoques}
          filterColumn="nome"
          filterPlaceholder="Nome do estoque"
        />
      </div>
    )
  );
};

export default ListarEstoques;
