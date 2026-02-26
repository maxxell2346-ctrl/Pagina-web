const pool = require("../db/connection");

//CREAR USUARIO
async function createUser(email, passwordHash) {
  const query = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at;
  `;

  const values = [email, passwordHash];

  const result = await pool.query(query, values);

  return result.rows[0];
}

// BUSCAR UN USUARIO POR MAIL
async function findUserByEmail(email) {
  const query = `
    SELECT id, email, password_hash, created_at
    FROM users
    WHERE email = $1
    LIMIT 1;
  `;

  const values = [email];
  const result = await pool.query(query, values);

  // Si no encontró nada, rows[0] será undefined
  return result.rows[0];
}

async function markEmailVerified(userId) {
  const query = `
    UPDATE users
    SET email_verified = TRUE
    WHERE id = $1
    RETURNING id, email, email_verified;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
  markEmailVerified,
};