import { Server } from "miragejs";
import { pedidos } from "./data/pedidos";

export function configurarRotaPedidos(server: Server) {
  server.get("/api/pedidos", () => {
    return { pedidos };
  });
}
