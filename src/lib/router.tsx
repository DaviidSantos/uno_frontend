import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CadastrarSolicitante from "../pages/solicitantes/CadastrarSolicitante";
import ListarSolicitantes from "../pages/solicitantes/ListarSolicitantes";
import DetalhesSolicitante from "../pages/solicitantes/DetalhesSolicitante";
import CadastrarSolicitacaoAnalise from "../pages/solicitacaoAnalise/CadastrarSolicitacaoAnalise";
import ListarSolicitacoesAnalise from "../pages/solicitacaoAnalise/ListarSolicitacoesAnalise";
import DetalhesSolicitacaoAnalise from "../pages/solicitacaoAnalise/DetalhesSolicitacaoAnalise";
import DetalhesLote from "../pages/lotes/DetalhesLote";
import CadastrarEstoque from "../pages/estoque/CadastrarEstoque";
import ListarEstoques from "../pages/estoque/ListarEstoques";
import DetalhesEstoque from "../pages/estoque/DetalhesEstoque";
import DetalhesAnalise from "../pages/analise/DetalhesAnalise";
import Dashboard from "../pages/dashboard/Dashboard";
import RelatorioContainer from "../pages/components/relatorio/RelatorioContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "/solicitante/cadastrar",
        element: <CadastrarSolicitante />,
      },
      {
        path: "/solicitante/listar",
        element: <ListarSolicitantes />,
      },
      {
        path: "/solicitante/:cnpj",
        element: <DetalhesSolicitante />,
      },
      {
        path: "/solicitacao-analise/cadastrar",
        element: <CadastrarSolicitacaoAnalise />,
      },
      {
        path: "/solicitacao-analise/listar",
        element: <ListarSolicitacoesAnalise />,
      },
      {
        path: "/solicitacao-analise/:idSa",
        element: <DetalhesSolicitacaoAnalise />,
      },
      {
        path: "/solicitacao-analise/:idSa/lote/:idLote",
        element: <DetalhesLote />,
      },
      {
        path: "/estoque/cadastrar",
        element: <CadastrarEstoque />,
      },
      {
        path: "/estoque/listar",
        element: <ListarEstoques />,
      },
      {
        path: "estoque/:nome",
        element: <DetalhesEstoque />,
      },
      {
        path: "analise/:id",
        element: <DetalhesAnalise />,
      },
      {
        path: "/relatorio/:idSa",
        element: <RelatorioContainer />,
      },
    ],
  },
]);
