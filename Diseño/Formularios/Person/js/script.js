import {
  
  getAll, getById, createEntity, updateEntity,
  deleteLogical, deletePermanent
} from "../../../js/scriptGeneric.js";

document.getElementById("personForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const person = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    documentType: document.getElementById("documentType").value,
    document: document.getElementById("document").value,
    dateBorn: document.getElementById("dateBorn").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    eps: document.getElementById("eps").value,
    genero: document.getElementById("genero").value,
    relatedPerson: document.getElementById("relatedPerson").checked
  };

  try {
    const response = await fetch("https://localhost:7287/api/person", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person)
    });

    if (response.ok) {
      alert("Persona registrada correctamente");
      this.reset();
    } else {
      const error = await response.json();
      alert("Error al registrar persona: " + error.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error de conexión con el servidor.");
  }
});

const entity = "Person"
// Mostrar todos
async function cargarPersonas() {
  const data = await getAll(entity);
  const tbody = document.querySelector("#rolesTable tbody");
  tbody.innerHTML = "";
  data.forEach(p => {
    const fila = `<tr>
  <td>${p.id}</td>
  <td>${p.firstName}</td>
  <td>${p.lastName}</td>
  <td>${p.documentType}</td>
  <td>${p.document}</td>
  <td>${p.phoneNumber}</td>
  <td>${p.eps}</td>
  <td>${p.genero}</td>
  <td>
    <button onclick="editarPersona(${p.id})">Editar</button>
    <button onclick="eliminarLogico(${p.id})">Eliminar Lógico</button>
    <button onclick="eliminarDefinitivo(${p.id})">Eliminar Permanente</button>
  </td>
</tr>`;
    tbody.innerHTML += fila;
  });
}

window.editarPersona = async (id) => {
  const p = await getById(entity, id);
  document.getElementById("personId").value = p.id;
  document.getElementById("firstName").value = p.firstName;
  document.getElementById("lastName").value = p.lastName;
  document.getElementById("documentType").value = p.documentType;
  document.getElementById("document").value = p.document;
  document.getElementById("dateBorn").value = p.dateBorn.split("T")[0];
  document.getElementById("phoneNumber").value = p.phoneNumber;
  document.getElementById("eps").value = p.eps;
  document.getElementById("genero").value = p.genero;
  document.getElementById("relatedPerson").checked = p.relatedPerson;
};

window.eliminarLogico = async (id) => {
  await deleteLogical(entity, id);
  alert("Eliminado lógicamente");
  cargarPersonas();
};

window.eliminarDefinitivo = async (id) => {
  await deletePermanent(entity, id);
  alert("Eliminado definitivamente");
  cargarPersonas();
};

document.addEventListener("DOMContentLoaded", cargarPersonas);
