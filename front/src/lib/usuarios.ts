import { Server, Response } from "miragejs";
import { usuarios } from "./data/usuarios";

export function configurarRotasUsuarios(server: Server) {
  server.get("/api/user", () => {
    return { usuarios };
  });

  server.post("/api/login", (_, request) => {
    const { username, password } = JSON.parse(request.requestBody);

    const usuario = usuarios.find(
      (u) => u.username === username && u.password === password
    );

    if (usuario) {
      return { usuario };
    } else {
      return new Response(401, {}, { error: "Credenciais inválidas" });
    }
  });

  server.post("/api/signup", (_, request) => {
    console.log(request);

    return new Response(200);
  });
}
