async function listVault() {
  return apiRequest("/vault", "GET", null, true);
}

async function createVaultItem(serviceName, loginName, secretValue) {
  return apiRequest("/vault", "POST", { serviceName, loginName, secretValue }, true);
}

async function updateVaultItem(id, serviceName, loginName, secretValue) {
  return apiRequest(`/vault/${id}`, "PUT", { serviceName, loginName, secretValue }, true);
}

async function deleteVaultItem(id) {
  return apiRequest(`/vault/${id}`, "DELETE", null, true);
}