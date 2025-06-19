import { Response, Server } from "miragejs";
import { pedidos } from "./data/pedidos";

export function configurarRotaPedidos(server: Server) {
  server.get("/api/pedidos", () => {
    return { pedidos };
  });

  server.post("/api/pedidos/mudarStatus", () => {
    return new Response(200);
  });

  server.post("/api/pedidos/concluirPedido", () => {
    return new Response(200);
  });
}
