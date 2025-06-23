// src/controllers/pedidoController.js
const pool = require('../config/db');
const path = require('path');
const fs = require('fs');
const Pedido = require('../models/Pedido');
const axios = require('axios');
const { buscarCoordenadas } = require('../utils/geocode');
const { calcularTempoDistancia } = require('../utils/orsService');

// Criar novo pedido com cálculo automático
exports.criarPedido = async (req, res) => {
  try {
    const {
      id_usuario,
      conteudo,
      peso,
      cep_origem,
      logradouro_origem,
      numero_origem,
      complemento_origem,
      cep_destino,
      logradouro_destino,
      numero_destino,
      complemento_destino
    } = req.body;

    if (
      !id_usuario || !conteudo || !peso || !cep_origem || !logradouro_origem ||
      !numero_origem || !cep_destino || !logradouro_destino || !numero_destino
    ) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
    }

    const origemCoords = await buscarCoordenadas(cep_origem, logradouro_origem, numero_origem);
    const destinoCoords = await buscarCoordenadas(cep_destino, logradouro_destino, numero_destino);

    if (!origemCoords || !destinoCoords) {
      return res.status(400).json({ erro: 'Não foi possível localizar os endereços.' });
    }

    const { distancia_km, tempo_estimado } = await calcularTempoDistancia(origemCoords, destinoCoords);
    const preco = (distancia_km * 2.5 + peso * 0.5).toFixed(2);

    const novoPedido = await Pedido.create({
      cliente_id: id_usuario,
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
      status: 'criado'
    });

    return res.status(201).json({ sucesso: true, pedido: novoPedido });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// Listar todos os pedidos
exports.listarPedidos = async (req, res, next) => {
  try {
    const [pedidos] = await pool.query(`SELECT * FROM Pedidos`);

    const pedidosFormatados = pedidos.map(pedido => ({
      id: pedido.id_pedido,
      id_usuario: pedido.cliente_id,
      id_entregador: pedido.motoboy_id || null,
      id_entregadoresRecusado: [], // implementar depois
      conteudo: pedido.conteudo || '',
      peso: pedido.peso,
      cep_origem: pedido.cep_origem || '',
      logradouro_origem: pedido.logradouro_origem || '',
      numero_origem: pedido.numero_origem || '',
      complemento_origem: pedido.complemento_origem || '',
      cep_destino: pedido.cep_destino || '',
      logradouro_destino: pedido.logradouro_destino || '',
      numero_destino: pedido.numero_destino || '',
      complemento_destino: pedido.complemento_destino || '',
      preco_final: pedido.preco,
      preco: pedido.preco?.toFixed(2),
      status: pedido.status,
      data_criacao: pedido.data_criacao
    }));

    res.json({ success: true, data: pedidosFormatados });
  } catch (err) {
    next(err);
  }
};

// Atualizar status e salvar no histórico
exports.atualizarStatus = async (req, res, next) => {
  try {
    const { pedido_id, status } = req.body;

    await pool.query(`UPDATE Pedidos SET status = ? WHERE id_pedido = ?`, [status, pedido_id]);
    await pool.query(`INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, ?)`, [pedido_id, status]);

    res.json({ success: true, message: 'Status atualizado com sucesso' });
  } catch (err) {
    next(err);
  }
};

// Consultar histórico de um pedido
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

// Concluir pedido com comprovante (imagem base64)
exports.concluirPedido = async (req, res, next) => {
  try {
    const { pedido_id, imagemBase64 } = req.body;

    const imagemBuffer = Buffer.from(imagemBase64, 'base64');
    const filePath = path.join(__dirname, `../../uploads/comprovante_${pedido_id}.png`);
    fs.writeFileSync(filePath, imagemBuffer);

    await pool.query(`UPDATE Pedidos SET status = 'entregue' WHERE id_pedido = ?`, [pedido_id]);
    await pool.query(`INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, 'entregue')`, [pedido_id]);

    res.json({ success: true, message: 'Pedido concluído com sucesso' });
  } catch (err) {
    next(err);
  }
};
