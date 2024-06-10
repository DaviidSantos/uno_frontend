import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import { DataTable } from "../components/table/DataTable";
import { reagenteTableColumns } from "../components/table/ColumnsDefinition";

const DetalhesEstoque = () => {
  const [reagentes, setReagentes] = useState<IReagente[]>();
  const { nome } = useParams();

  useEffect(() => {
    fetchReagentes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReagentes = async () => {
    const { data } = await axios.get<IReagente[]>(
      `https://uno-api-pdre.onrender.com/api/v1/reagente?estoque=${nome}`
    );

    setReagentes(data);
  };

  return (
    reagentes && (
      <div className="container max-w-screen-2xl py-10">
        <Heading title={`Reagentes presente no estoque ${nome}`} />
        <DataTable
          columns={reagenteTableColumns}
          data={reagentes}
          filterColumn="nome"
          filterPlaceholder="Nome do reagente"
        />
      </div>
    )
  );
};

export default DetalhesEstoque;
