import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api", // Substitua se sua API estiver em outra porta ou endereço
});
