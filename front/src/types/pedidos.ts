export interface Pedido {
  id_pedido: number;
  cliente_id: number;
  motoboy_id?: number;
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
  distancia_km: string;
  preco: string;
  tempo_estimado: number;
}

export enum PedidoStatus {
  Criado = "Criado",
  Aceito = "Aceito",
  EmTransito = "EmTransito",
  Cancelado = "Cancelado",
  Entregue = "Entregue",
  Falhou = "Falhou",
}
