const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

// ===================== REGISTER =============================================

async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y password son obligatorios"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser(email, passwordHash);

    res.status(201).json({
      message: "Usuario creado correctamente",
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

// ===================== LOGIN ===============================================

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // valido que los datos sean enviados
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y password son obligatorios",
      });
    }

    // busco por email
    const user = await userRepository.findUserByEmail(email);

    // Si no existe, devolvemos "credenciales inválidas"
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // comparo las contraseñas
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // El "payload" es lo que guardás dentro del token (no pongas la password)
    const payload = { userId: user.id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    // 5) Responder al cliente con el token
    return res.status(200).json({
      message: "Login correcto",
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

// ============ VERIFICO TOKEN ==============================================

function me(req, res) {
  // req.user viene del middleware
  return res.json({
    message: "Token válido",
    user: req.user,
  });
}

module.exports = {
  register,
  login,
  me,
};