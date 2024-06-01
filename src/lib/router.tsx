import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CadastrarSolicitante from "../pages/solicitantes/CadastrarSolicitante";
import ListarSolicitantes from "../pages/solicitantes/ListarSolicitantes";
import DetalhesSolicitante from "../pages/solicitantes/DetalhesSolicitante";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/solicitante/cadastrar",
        element: <CadastrarSolicitante />
      },
      {
        path: "/solicitante/listar",
        element: <ListarSolicitantes />
      },
      {
        path: "/solicitante/:cnpj",
        element: <DetalhesSolicitante />
      }
    ]
  }
])
