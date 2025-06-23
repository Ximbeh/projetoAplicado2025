import { createServer } from "miragejs";
import { configurarRotasUsuarios } from "./usuarios";
import { configurarRotaPedidos } from "./pedido";

export function makeServer() {
  return createServer({
    routes() {
      configurarRotasUsuarios(this);
      configurarRotaPedidos(this);
    },
  });
}
