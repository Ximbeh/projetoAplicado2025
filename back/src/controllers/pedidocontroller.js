// src/controllers/pedidoController.js
const pool = require("../config/db");
const path = require("path");
const fs = require("fs");
const Pedido = require("../models/Pedido");
const { buscarCoordenadas } = require("../utils/geocode");
const { calcularTempoDistancia } = require("../utils/orsService");

// Criar novo pedido com cálculo automático
exports.criarPedido = async (req, res, next) => {
  try {
    const {
      peso,
      conteudo,
      cep_origem,
      logradouro_origem,
      numero_origem,
      complemento_origem,
      cep_destino,
      logradouro_destino,
      numero_destino,
      complemento_destino
    } = req.body;

    const cliente_id = req.usuario.id;

    // Verificar campos obrigatórios
    if (
      !peso || !conteudo || !cep_origem || !logradouro_origem || !numero_origem ||
      !cep_destino || !logradouro_destino || !numero_destino
    ) {
      return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }

    // Verificar limite de peso
    if (peso > 12) {
      return res.status(400).json({ erro: "Peso excede o limite de 12kg. Não transportamos acima desse valor." });
    }

    // Definir taxa adicional conforme peso
    let taxaPeso = 0;
    if (peso < 1) {
      taxaPeso = 3;
    } else if (peso >= 1 && peso < 3) {
      taxaPeso = 5;
    } else if (peso >= 3 && peso < 8) {
      taxaPeso = 9;
    } else if (peso >= 8 && peso <= 12) {
      taxaPeso = 12;
    }

    // Buscar coordenadas
    const origemCoords = await buscarCoordenadas(cep_origem, logradouro_origem, numero_origem);
    const destinoCoords = await buscarCoordenadas(cep_destino, logradouro_destino, numero_destino);

    if (!origemCoords || !destinoCoords) {
      return res.status(400).json({ erro: "Não foi possível localizar os endereços." });
    }

    // Calcular distância e tempo
    const { distancia_km, tempo_estimado } = await calcularTempoDistancia(origemCoords, destinoCoords);

    // Calcular preço total
    const precoBase = distancia_km * 2.5;
    const preco = parseFloat(precoBase + taxaPeso).toFixed(2);

    // Inserir pedido no banco
    const [resultado] = await pool.query(
      `INSERT INTO Pedidos 
        (cliente_id, peso, distancia_km, tempo_estimado, preco, status, conteudo,
         cep_origem, logradouro_origem, numero_origem, complemento_origem,
         cep_destino, logradouro_destino, numero_destino, complemento_destino)
       VALUES (?, ?, ?, ?, ?, 'criado', ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cliente_id, peso, distancia_km, tempo_estimado, preco, conteudo,
        cep_origem, logradouro_origem, numero_origem, complemento_origem,
        cep_destino, logradouro_destino, numero_destino, complemento_destino
      ]
    );

    // Adicionar ao histórico de status
    const pedido_id = resultado.insertId;
    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, 'criado')`,
      [pedido_id]
    );

    return res.status(201).json({
      sucesso: true,
      mensagem: "Pedido criado com sucesso.",
      pedido_id,
      preco,
      distancia_km,
      tempo_estimado
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({ erro: "Erro ao criar pedido." });
  }
};


// Calcular valor estimado
exports.calcularValorPedido = async (req, res) => {
  try {
    const {
      peso,
      cep_origem,
      logradouro_origem,
      numero_origem,
      cep_destino,
      logradouro_destino,
      numero_destino,
    } = req.body;

    if (
      !peso ||
      !cep_origem ||
      !logradouro_origem ||
      !numero_origem ||
      !cep_destino ||
      !logradouro_destino ||
      !numero_destino
    ) {
      return res
        .status(400)
        .json({ erro: "Campos obrigatórios ausentes para cálculo." });
    }

    // Verificar limite de peso
    if (peso > 12) {
      return res
        .status(400)
        .json({ erro: "Peso excede o limite de 12kg. Não transportamos acima desse valor." });
    }

    // Calcular taxa adicional por faixa de peso
    let taxaPeso = 0;
    if (peso < 1) {
      taxaPeso = 3;
    } else if (peso >= 1 && peso < 3) {
      taxaPeso = 5;
    } else if (peso >= 3 && peso < 8) {
      taxaPeso = 9;
    } else if (peso >= 8 && peso <= 12) {
      taxaPeso = 12;
    }

    const origemCoords = await buscarCoordenadas(
      cep_origem,
      logradouro_origem,
      numero_origem
    );
    const destinoCoords = await buscarCoordenadas(
      cep_destino,
      logradouro_destino,
      numero_destino
    );

    if (!origemCoords || !destinoCoords) {
      return res
        .status(400)
        .json({ erro: "Não foi possível localizar os endereços." });
    }

    const { distancia_km, tempo_estimado } = await calcularTempoDistancia(
      origemCoords,
      destinoCoords
    );

    const precoBase = distancia_km * 2.5;
    const precoFinal = parseFloat(precoBase + taxaPeso).toFixed(2);

    return res.status(200).json({
      sucesso: true,
      loading: false,
      distancia_km,
      tempo_estimado,
      preco_estimado: precoFinal,
    });
  } catch (error) {
    console.error("Erro ao calcular valor do pedido:", error);
    return res.status(500).json({ erro: "Erro ao calcular valor estimado." });
  }
};


// Listar todos os pedidos disponíveis (excluindo recusados)
exports.listarPedidos = async (req, res, next) => {
  try {
    const id_motoboy = req.usuario?.id;

    const [pedidos] = await pool.query(
      `
      SELECT * FROM Pedidos
WHERE status = 'Criado'
  AND id_pedido NOT IN (
    SELECT pedido_id FROM RecusasPedidos WHERE motoboy_id = ?
)
    `,
      [id_motoboy]
    );

    const pedidosFormatados = await Promise.all(
      pedidos.map(async (pedido) => {
        const [recusas] = await pool.query(
          `SELECT motoboy_id FROM RecusasPedidos WHERE pedido_id = ?`,
          [pedido.id_pedido]
        );
        const recusados = recusas.map((r) => r.motoboy_id);

        return {
          id_pedido: pedido.id_pedido,
          id_usuario: pedido.cliente_id,
          id_entregador: pedido.motoboy_id || null,
          id_entregadoresRecusado: recusados,
          conteudo: pedido.conteudo || "",
          peso: pedido.peso,
          cep_origem: pedido.cep_origem || "",
          logradouro_origem: pedido.logradouro_origem || "",
          numero_origem: pedido.numero_origem || "",
          complemento_origem: pedido.complemento_origem || "",
          cep_destino: pedido.cep_destino || "",
          logradouro_destino: pedido.logradouro_destino || "",
          numero_destino: pedido.numero_destino || "",
          complemento_destino: pedido.complemento_destino || "",
          distancia_km: Number(pedido.distancia_km),
          tempo_estimado: pedido.tempo_estimado,
          preco_final: Number(pedido.preco),
          preco: Number(pedido.preco).toFixed(2),
          status: pedido.status,
          data_criacao: pedido.data_criacao,
        };
      })
    );

    res.json({ success: true, data: pedidosFormatados });
  } catch (err) {
    next(err);
  }
};

// Aceitar pedido
exports.aceitarPedido = async (req, res, next) => {
  try {
    const { pedido_id, motoboy_id } = req.body;

    if (!pedido_id || !motoboy_id) {
      return res
        .status(400)
        .json({ success: false, message: "Pedido ou motoboy não informado" });
    }

    const [verifica] = await pool.query(
      `SELECT status FROM Pedidos WHERE id_pedido = ?`,
      [pedido_id]
    );

    if (!verifica.length || verifica[0].status !== "Criado") {
      return res.status(400).json({
        success: false,
        message: "Pedido já foi Aceito ou não existe.",
      });
    }

    await pool.query(
      `UPDATE Pedidos SET motoboy_id = ?, status = 'Aceito' WHERE id_pedido = ?`,
      [motoboy_id, pedido_id]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, 'Aceito')`,
      [pedido_id]
    );

    res.json({ success: true, message: "Pedido Aceito com sucesso" });
  } catch (err) {
    next(err);
  }
};

// Recusar pedido
exports.recusarPedido = async (req, res, next) => {
  try {
    const { pedido_id, motoboy_id } = req.body;

    if (!pedido_id || !motoboy_id) {
      return res
        .status(400)
        .json({ success: false, message: "Campos obrigatórios ausentes" });
    }

    const [verifica] = await pool.query(
      `SELECT * FROM RecusasPedidos WHERE pedido_id = ? AND motoboy_id = ?`,
      [pedido_id, motoboy_id]
    );

    if (verifica.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Motoboy já recusou este pedido" });
    }

    await pool.query(
      `INSERT INTO RecusasPedidos (pedido_id, motoboy_id) VALUES (?, ?)`,
      [pedido_id, motoboy_id]
    );

    const [motoboys] = await pool.query(
      'SELECT id_usuario FROM Usuarios WHERE tipo = "motoboy"'
    );
    const totalMotoboys = motoboys.length;

    const [recusas] = await pool.query(
      "SELECT COUNT(*) AS total FROM RecusasPedidos WHERE pedido_id = ?",
      [pedido_id]
    );

    if (recusas[0].total >= totalMotoboys) {
      await pool.query(
        `UPDATE Pedidos SET status = 'Cancelado' WHERE id_pedido = ?`,
        [pedido_id]
      );

      await pool.query(
        `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, 'Cancelado')`,
        [pedido_id]
      );
    }

    res.json({ success: true, message: "Pedido recusado com sucesso" });
  } catch (err) {
    next(err);
  }
};

// Concluir pedido com comprovante (imagem base64)
exports.concluirPedido = async (req, res, next) => {
  try {
    const { pedido_id, imagemBase64, observacao, status } = req.body;

    const imagemBuffer = Buffer.from(imagemBase64, "base64");
    const filePath = path.join(
      __dirname,
      `../../uploads/comprovante_${pedido_id}.png`
    );
    fs.writeFileSync(filePath, imagemBuffer);

    await pool.query(`UPDATE Pedidos SET status = ? WHERE id_pedido = ?`, [
      status,
      pedido_id,
    ]);
    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, ?)`,
      [pedido_id, status]
    );

    res.json({ success: true, message: "Pedido concluído com sucesso" });
  } catch (err) {
    next(err);
  }
};

// Histórico do pedido
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

// Pedidos em andamento para cliente
exports.pedidosEmAndamentoCliente = async (req, res, next) => {
  try {
    const id_cliente = req.usuario.id;
    const [pedidos] = await pool.query(
      `SELECT * FROM Pedidos WHERE cliente_id = ? AND status IN ('Criado', 'Aceito', 'EmTransito')`,
      [id_cliente]
    );
    res.json({ success: true, data: pedidos });
  } catch (err) {
    next(err);
  }
};

// Histórico do cliente
exports.historicoCliente = async (req, res, next) => {
  try {
    const id_cliente = req.usuario.id;
    const [pedidos] = await pool.query(
      `SELECT * FROM Pedidos WHERE cliente_id = ? AND status IN ('Entregue', 'Cancelado', 'Falhou')`,
      [id_cliente]
    );
    res.json({ success: true, data: pedidos });
  } catch (err) {
    next(err);
  }
};

// Pedidos ativos do motoboy
exports.pedidosAtivosMotoboy = async (req, res, next) => {
  try {
    const id_motoboy = req.usuario.id;
    const [pedidos] = await pool.query(
      `SELECT * FROM Pedidos WHERE motoboy_id = ? AND status IN ('Aceito', 'EmTransito')`,
      [id_motoboy]
    );
    res.json({ success: true, data: pedidos });
  } catch (err) {
    next(err);
  }
};

// Histórico do motoboy
exports.historicoMotoboy = async (req, res, next) => {
  try {
    const id_motoboy = req.usuario.id;
    const [pedidos] = await pool.query(
      `SELECT * FROM Pedidos WHERE motoboy_id = ? AND status IN ('Entregue', 'Cancelado', 'Falhou')`,
      [id_motoboy]
    );
    res.json({ success: true, data: pedidos });
  } catch (err) {
    next(err);
  }
};

exports.cancelarPedido = async (req, res, next) => {
  try {
    const { pedido_id } = req.body;
    const id_cliente = req.usuario.id;

    if (!pedido_id) {
      return res
        .status(400)
        .json({ success: false, message: "ID do pedido é obrigatório" });
    }

    const [resultado] = await pool.query(
      `SELECT * FROM Pedidos WHERE id_pedido = ? AND cliente_id = ?`,
      [pedido_id, id_cliente]
    );

    if (resultado.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Pedido não encontrado ou não pertence a este cliente",
      });
    }

    await pool.query(
      `UPDATE Pedidos SET status = 'Cancelado' WHERE id_pedido = ?`,
      [pedido_id]
    );

    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status, data_status) VALUES (?, 'Cancelado', NOW())`,
      [pedido_id]
    );

    res.json({ success: true, message: "Pedido cancelado com sucesso" });
  } catch (err) {
    next(err);
  }
};

// Motoboy muda status para EmTransito
exports.mudarStatusPedido = async (req, res, next) => {
  try {
    const { pedido_id, status } = req.body;

    if (!pedido_id || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Campos obrigatórios ausentes" });
    }

    await pool.query(`UPDATE Pedidos SET status = ? WHERE id_pedido = ?`, [
      status,
      pedido_id,
    ]);
    await pool.query(
      `INSERT INTO HistoricoEntregas (pedido_id, status) VALUES (?, ?)`,
      [pedido_id, status]
    );

    res.json({ success: true, message: "Status atualizado com sucesso" });
  } catch (err) {
    next(err);
  }
};

// pedido em específico baseadoi no id, passo o id e retorna todas as informações do pedido
exports.pedidoDoClientePorId = async (req, res, next) => {
  try {
    const { id_pedido } = req.params;

    const [pedidos] = await pool.query(
      `SELECT * FROM Pedidos 
       WHERE id_pedido = ?`,
      [id_pedido]
    );

    if (pedidos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Pedido não encontrado",
      });
    }

    res.json({ success: true, data: pedidos[0] });
  } catch (err) {
    next(err);
  }
};
