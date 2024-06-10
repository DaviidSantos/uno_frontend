import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import { DataTable } from "../components/table/DataTable";
import { reagenteTableColumns } from "../components/table/ColumnsDefinition";
import CadastrarReagente from "./components/CadastrarReagente";

const DetalhesEstoque = () => {
  const [reagentes, setReagentes] = useState<IReagente[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { nome } = useParams();

  useEffect(() => {
    fetchReagentes();
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
        <div className="flex items-center justify-between">
          <Heading title={`Reagentes presente no estoque ${nome}`} />
          <CadastrarReagente
            nomeEstoque={nome!}
            fetchReagentes={fetchReagentes}
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
          />
        </div>
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
