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

interface ILote {
  id: string;
  amostra: string;
  notaFiscal: string;
  dataEntrada: string;
  dataValidade: string;
  descricao: string;
  quantidade: number;
  solicitacaoAnalise: ISolicitacaoAnalise;
}

interface IAnalise {
  id: string;
  especificacao: number;
  resultado: number;
  unidade: string;
  observacao?: string;
  lote: ILote;
  ensaio: IEnsaio;
}

interface IEnsaio {
  id: string;
  nome: string;
}

interface IEstoque {
  id: string;
  nome: string;
  solicitante: ISolicitante;
}

interface IReagente {
  id: string;
  nome: string;
  dataValidade: string;
  fornecedor: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  estoque: IEstoque;
}

interface IReagenteAnalise {
  analise_id: string;
  reagente_id: string;
  quantidade: number;
}
