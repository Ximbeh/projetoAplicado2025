export interface Pedido {
  id: number;
  id_usuario: number;
  id_entregador?: number;
  id_entregadoresRecusado: number[];
  conteudo: string;
  peso: number;
  cep_origem: number;
  logradouro_origem: string;
  numero_origem: string;
  complemento_origem: string;
  cep_destino: number;
  logradouro_destino: string;
  numero_destino: string;
  complemento_destino: string;
  preco_final: number;
  status: PedidoStatus;
  data_criacao: string;
}

export enum PedidoStatus {
  Pendente = "Pendente",
  Aceito = "Aceito",
  EmTransporte = "EmTransporte",
  AguardandoPagamento = "AguardandoPagamento",
  Cancelado = "Cancelado",
  Concluido = "Concluido",
  Falhou = "Falhou",
}
