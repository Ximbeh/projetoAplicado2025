export type Usuario = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  tipoVeiculo?: string;
  placa?: string;
  chassi?: string;
  cnh?: string;
  entregador: boolean;
  senha: string;
};
