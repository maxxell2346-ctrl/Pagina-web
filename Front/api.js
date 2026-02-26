const API_BASE_URL = "http://127.0.0.1:5500/Front/index.html";

function getToken() {
  return localStorage.getItem("token");
}

async function apiRequest(path, method = "GET", body = null, auth = false) {
  const headers = {};

  // Si mandamos body, avisamos que es JSON
  if (body) headers["Content-Type"] = "application/json";

  // Si requiere auth, mandamos el token
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  // Intentamos parsear JSON siempre (tu backend responde JSON)
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Creamos un error con mensaje del backend si existe
    const message = data?.message || `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}