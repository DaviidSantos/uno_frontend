import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CadastrarSolicitante from "../pages/solicitantes/CadastrarSolicitante";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/solicitante/cadastrar",
        element: <CadastrarSolicitante />
      }
    ]
  }
])
