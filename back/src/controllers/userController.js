const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// Buscar todos os usuários
exports.getAllUsers = async (req, res, next) => {
  try {
    const [usuarios] = await pool.query("SELECT * FROM Usuarios");
    res.json({ success: true, data: usuarios });
  } catch (err) {
    next(err);
  }
};

// Pegar usuario baseado no ID
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Usuarios WHERE id_usuario = ?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// Cadastrar novo usuário
exports.cadastrarUsuario = async (req, res) => {
  try {
    const {
      nome,
      cpf,
      email,
      senha,
      telefone,
      tipo,
      cnh,
      placa_moto, // recebido do front
      tipo_veiculo, // recebido do front
      chassi,
    } = req.body;

    // Verifica se CPF já está cadastrado
    const [cpfExistente] = await pool.query(
      `SELECT id_usuario FROM Usuarios WHERE cpf = ?`,
      [cpf]
    );
    if (cpfExistente.length > 0) {
      return res.status(400).json({ erro: "CPF já cadastrado" });
    }

    // Validação básica de CPF (11 dígitos)
    const cpfValido = /^\d{11}$/.test(cpf);
    if (!cpfValido) {
      return res.status(400).json({ erro: "CPF inválido" });
    }

    // (Opcional) Validação de placa_moto veicular — formato Mercosul simples
    if (
      tipo === "motoboy" &&
      placa_moto &&
      !/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(placa_moto.toUpperCase())
    ) {
      return res
        .status(400)
        .json({ erro: "placa_moto inválida. Formato esperado: ABC1D23" });
    }

    const hashSenha = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
      `INSERT INTO Usuarios 
        (nome, cpf, email, senha_hash, telefone, tipo, cnh, placa_moto, tipo_veiculo, chassi)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        cpf,
        email,
        hashSenha,
        telefone,
        tipo,
        tipo === "motoboy" ? cnh : null,
        tipo === "motoboy" ? placa_moto : null,
        tipo === "motoboy" ? tipo_veiculo : null,
        tipo === "motoboy" ? chassi : null,
      ]
    );

    return res.status(201).json({ sucesso: true, id_usuario: result.insertId });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ erro: "Erro interno ao cadastrar usuário" });
  }
};

// Login genérico (caso alguém use a rota errada)
exports.login = async (req, res) => {
  res
    .status(400)
    .json({ success: false, message: "Use /api/login/usuario ou /motoboy" });
};

// Atualizar dados do usuário
exports.editarUsuario = async (req, res, next) => {
  try {
    const { id_usuario, nome, telefone } = req.body;

    await pool.query(
      `UPDATE Usuarios SET nome = ?, telefone = ? WHERE id_usuario = ?`,
      [nome, telefone, id_usuario]
    );

    res.json({ success: true, message: "Usuário atualizado com sucesso" });
  } catch (err) {
    next(err);
  }
};

// Deletar usuário
exports.deletarUsuario = async (req, res, next) => {
  try {
    const { id_usuario } = req.body;

    await pool.query(`DELETE FROM Usuarios WHERE id_usuario = ?`, [id_usuario]);

    res.json({ success: true, message: "Usuário deletado com sucesso" });
  } catch (err) {
    next(err);
  }
};

// Alterar senha
exports.alterarSenha = async (req, res, next) => {
  try {
    const { id_usuario, novaSenha } = req.body;
    const senha_hash = await bcrypt.hash(novaSenha, 10);

    await pool.query(`UPDATE Usuarios SET senha = ? WHERE id_usuario = ?`, [
      senha_hash,
      id_usuario,
    ]);

    res.json({ success: true, message: "Senha alterada com sucesso" });
  } catch (err) {
    next(err);
  }
};

exports.editarPerfil = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Campos que podem ser atualizados
    const campos = {
      nome: req.body.nome,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      email: req.body.email,
      tipo: req.body.tipo,
      cnh: req.body.cnh,
      placa_moto: req.body.placa_moto || null,
      tipo_veiculo: req.body.tipo_veiculo || null,
      chassi: req.body.chassi,
    };

    // Remove campos que vieram como null ou undefined
    const camposValidos = Object.entries(campos).filter(
      ([_, valor]) => valor !== null && valor !== undefined
    );

    if (camposValidos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum dado válido para atualizar.",
      });
    }

    // Monta a query dinamicamente
    const setClause = camposValidos.map(([key]) => `${key} = ?`).join(", ");
    const values = camposValidos.map(([_, value]) => value);

    const [resultado] = await pool.query(
      `UPDATE Usuarios SET ${setClause} WHERE id_usuario = ?`,
      [...values, id]
    );

    if (resultado.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuário não encontrado" });
    }

    res.json({ success: true, message: "Perfil atualizado com sucesso" });
  } catch (error) {
    next(error);
  }
};
