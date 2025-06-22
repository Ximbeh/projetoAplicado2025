// src/controllers/pedidoController.js
const pool = require('../config/db');
const path = require('path');
const fs = require('fs');

// Criar pedido com cálculo de preço
exports.criarPedido = async (req, res, next) => {
  try {
    const { cliente_id, peso, distancia_km, tempo_estimado } = req.body;

    // Cálculo do preço no backend
    const preco = (peso * 0.5) + (distancia_km * 1.2) + (tempo_estimado * 0.3);

    const [result] = await pool.query(
      `INSERT INTO Pedidos (cliente_id, peso, distancia_km, tempo_estimado, preco)
       VALUES (?, ?, ?, ?, ?)`,
      [cliente_id, peso, distancia_km, tempo_estimado, preco]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, 'criado')`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      id: result.insertId
    });
  } catch (err) {
    next(err);
  }
};

// Listar todos os pedidos
exports.listarPedidos = async (req, res, next) => {
  try {
    const [pedidos] = await pool.query('SELECT * FROM Pedidos');

    const pedidosFormatados = pedidos.map(pedido => ({
      id: pedido.id_pedido,
      id_usuario: pedido.cliente_id,
      id_entregador: pedido.motoboy_id || null,
      id_entregadoresRecusado: [],
      conteudo: '',
      peso: pedido.peso,
      cep_origem: '',
      logradouro_origem: '',
      numero_origem: '',
      complemento_origem: '',
      cep_destino: '',
      logradouro_destino: '',
      numero_destino: '',
      complemento_destino: '',
      preco_final: pedido.preco,
      status: pedido.status,
      data_criacao: pedido.data_criacao
    }));

    res.json({ success: true, data: pedidosFormatados });
  } catch (err) {
    next(err);
  }
};

// Filtrar pedidos
exports.filtrarPedidos = async (req, res, next) => {
  try {
    const { cliente_id, motoboy_id, status } = req.query;

    let query = 'SELECT * FROM Pedidos WHERE 1=1';
    const params = [];

    if (cliente_id) {
      query += ' AND cliente_id = ?';
      params.push(cliente_id);
    }

    if (motoboy_id) {
      query += ' AND motoboy_id = ?';
      params.push(motoboy_id);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    const [pedidos] = await pool.query(query, params);
    res.json({ success: true, data: pedidos });
  } catch (err) {
    next(err);
  }
};

// Atualizar status e registrar no histórico
exports.atualizarStatus = async (req, res, next) => {
  try {
    const { pedido_id, status } = req.body;

    await pool.query(
      `UPDATE Pedidos SET status = ? WHERE id_pedido = ?`,
      [status, pedido_id]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, ?)`,
      [pedido_id, status]
    );

    res.json({ success: true, message: 'Status atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};

// Histórico de um pedido
exports.historicoPedido = async (req, res, next) => {
  try {
    const { id_pedido } = req.params;

    const [historico] = await pool.query(
      `SELECT * FROM HistoricoEntregas WHERE pedido_id = ? ORDER BY data_status ASC`,
      [id_pedido]
    );

    res.json({ success: true, data: historico });
  } catch (err) {
    next(err);
  }
};

// Concluir pedido com imagem base64 (simulada)
exports.concluirPedido = async (req, res, next) => {
  try {
    const { pedido_id, imagemBase64 } = req.body;

    // Simulação de salvamento de imagem base64
    const imagemBuffer = Buffer.from(imagemBase64, 'base64');
    const filePath = path.join(__dirname, `../../uploads/comprovante_${pedido_id}.png`);
    fs.writeFileSync(filePath, imagemBuffer);

    await pool.query(
      `UPDATE Pedidos SET status = 'entregue' WHERE id_pedido = ?`,
      [pedido_id]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, 'entregue')`,
      [pedido_id]
    );

    res.json({ success: true, message: 'Pedido concluído com sucesso' });
  } catch (err) {
    next(err);
  }
};
