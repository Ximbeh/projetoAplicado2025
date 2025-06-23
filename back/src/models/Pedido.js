const pool = require('../config/db');

const Pedido = {
  create: async (dados) => {
    const {
      cliente_id,
      conteudo,
      peso,
      cep_origem,
      logradouro_origem,
      numero_origem,
      complemento_origem,
      cep_destino,
      logradouro_destino,
      numero_destino,
      complemento_destino,
      distancia_km,
      tempo_estimado,
      preco,
      status
    } = dados;

    const [result] = await pool.query(`
      INSERT INTO Pedidos (
        cliente_id, conteudo, peso,
        cep_origem, logradouro_origem, numero_origem, complemento_origem,
        cep_destino, logradouro_destino, numero_destino, complemento_destino,
        distancia_km, tempo_estimado, preco, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      cliente_id,
      conteudo,
      peso,
      cep_origem,
      logradouro_origem,
      numero_origem,
      complemento_origem,
      cep_destino,
      logradouro_destino,
      numero_destino,
      complemento_destino,
      distancia_km,
      tempo_estimado,
      preco,
      status
    ]);

    return {
      id_pedido: result.insertId,
      ...dados
    };
  }
};

module.exports = Pedido;
