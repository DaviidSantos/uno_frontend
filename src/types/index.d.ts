interface ISolicitante {
  id: string;
  cnpj: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
}

interface ISolicitacaoAnalise {
  id?: string;
  idSa?: string;
  nomeProjeto: string;
  tipoAnalise: string;
  prazoAcordado: string;
  conclusaoProjeto?: string;
  descricaoProjeto: string;
  solicitante: ISolicitante;
}
