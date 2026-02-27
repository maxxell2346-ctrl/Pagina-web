async function register(email, password) {
  return apiRequest("/auth/register", "POST", { email, password }, false);
}

async function login(email, password) {
  const data = await apiRequest("/auth/login", "POST", { email, password }, false);
  localStorage.setItem("token", data.token);
  return data;
}

function logout() {
  localStorage.removeItem("token");
}

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

async function verifyEmail(email, code) {
  return apiRequest("/auth/verify-email", "POST", { email, code }, false);
}