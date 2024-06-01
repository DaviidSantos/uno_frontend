import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../../components/ui/button"
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import { parseCnpj } from "../../../lib/utils"

export const solicitanteTableColumns: ColumnDef<ISolicitante>[] = [
  {
    accessorKey: "cnpj",
    header: "CNPJ"
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const solicitante = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="px-2 py-2">
              <Link to={`/solicitante/${parseCnpj(solicitante.cnpj)}`} className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800">
                <Eye className="h-4 w-4" />
                <span className="text-xs font-bold">
                  Ver mais
                </span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export const solicitacaoAnaliseTableColumns: ColumnDef<ISolicitacaoAnalise>[] = [
  {
    accessorKey: "idSa",
    header: "Id SA"
  },
  {
    accessorKey: "nomeProjeto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Projeto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "tipoAnalise",
    header: "Tipo de Análise"
  },
  {
    accessorKey: "prazoAcordado",
    header: "Prazo Acordado"
  },
  {
    accessorKey: "conclusaoProjeto",
    header: "Conclusao Projeto"
  }
]
