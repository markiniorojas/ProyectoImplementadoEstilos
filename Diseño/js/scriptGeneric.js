const apiBaseUrl = "https://localhost:7287/api";

export async function getAll(entity) {
  const response = await fetch(`${apiBaseUrl}/${entity}`);
  return await response.json();
}

export async function getById(entity, id) {
  const response = await fetch(`${apiBaseUrl}/${entity}/${id}`);
  return await response.json();
}

export async function createEntity(entity, data) {
  const response = await fetch(`${apiBaseUrl}/${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function updateEntity(entity, data) {
  const response = await fetch(`${apiBaseUrl}/${entity}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function deleteLogical(entity, id) {
  const response = await fetch(`${apiBaseUrl}/${entity}/Logico/${id}`, {
    method: "PUT"
  });
  return await response.json();
}

export async function deletePermanent(entity, id) {
  const response = await fetch(`${apiBaseUrl}/${entity}/permanent/${id}`, {
    method: "DELETE"
  });
  return await response.json();
}
