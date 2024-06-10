export const navitems = [
  {
    key: "uno-navitem-01",
    title: "Solicitantes",
    navlinks: [
      {
        key: "uno-navlink-01",
        title: "Cadastar Solicitante",
        description: "Cadastre os dados de um novo cliente do laboratório",
        href: "/solicitante/cadastrar",
      },
      {
        key: "uno-navlink-02",
        title: "Listar Solicitantes",
        description: "Veja a listagem dos clientes do laboratório",
        href: "/solicitante/listar",
      },
    ],
  },
  {
    key: "uno-navitem-02",
    title: "Solicitação de Análise",
    navlinks: [
      {
        key: "uno-navlink-03",
        title: "Cadastrar Solicitação de Análise",
        description:
          "Cadastre um novo projeto de um cliente para o laboratório",
        href: "/solicitacao-analise/cadastrar",
      },
      {
        key: "uno-navlink-04",
        title: "Listar Solicitações de Análise",
        description:
          "Veja a listagem de todas as Solicitações de Análise feitas pelo laboratório",
        href: "/solicitacao-analise/listar",
      },
    ],
  },
  {
    key: "uno-navitem-03",
    title: "Estoque",
    navlinks: [
      {
        key: "uno-navlink-05",
        title: "Cadastrar estoque",
        description: "Crie um novo estoque para o solicitante",
        href: "/estoque/cadastrar",
      },
      {
        key: "uno-navlink-06",
        title: "Listar estoques",
        description: "Listar todos os estoques cadastrados",
        href: "/estoque/listar",
      },
    ],
  },
];
