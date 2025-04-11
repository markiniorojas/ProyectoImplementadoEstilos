// Script para gestionar CRUD de Personas
document.addEventListener("DOMContentLoaded", cargarPersonas);

// URL base específica para Person
const API_URL = 'https://localhost:7287/api/Person';

// Evento submit para crear o actualizar
document.getElementById("personForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("personId").value) || 0;

  const person = {
    id,
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
    if (id > 0) {
      // Actualizar persona existente
      await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
      });
      alert("Persona actualizada correctamente");
    } else {
      // Crear nueva persona
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
      });
      alert("Persona registrada correctamente");  
    }
    
    // Limpiar formulario y recargar tabla
    this.reset();
    document.getElementById("personId").value = "";
    cargarPersonas();
  } catch (err) {
    console.error("Error al guardar:", err);
    alert("Error al guardar persona");
  }
});

// Cargar todas las personas
async function cargarPersonas() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    const tbody = document.querySelector("#rolesTable tbody");
    tbody.innerHTML = "";
    
    data.forEach(p => {
      const fila = `<tr>
        <td>${p.id}</td>
        <td>${p.firstName || ''}</td>
        <td>${p.lastName || ''}</td>
        <td>${p.documentType || ''}</td>
        <td>${p.document || ''}</td>
        <td>${p.phoneNumber || ''}</td>
        <td>${p.eps || ''}</td>
        <td>${p.genero || ''}</td>
        <td>
          <button onclick="editarPersona(${p.id})" class="btn btn-warning btn-sm">Editar</button>
          <button onclick="eliminarLogico(${p.id})" class="btn btn-secondary btn-sm">Eliminar Lógico</button>
          <button onclick="eliminarDefinitivo(${p.id})" class="btn btn-danger btn-sm">Eliminar Permanente</button>
        </td>
      </tr>`;
      tbody.innerHTML += fila;
    });
  } catch (error) {
    console.error("Error al cargar personas:", error);
    alert("Error al cargar personas");
  }
}

// Editar persona
window.editarPersona = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const p = await response.json();
    
    document.getElementById("personId").value = p.id;
    document.getElementById("firstName").value = p.firstName || '';
    document.getElementById("lastName").value = p.lastName || '';
    document.getElementById("documentType").value = p.documentType || '';
    document.getElementById("document").value = p.document || '';
    
    // Formatear fecha
    if (p.dateBorn) {
      const fecha = new Date(p.dateBorn);
      const fechaFormateada = fecha.toISOString().split('T')[0];
      document.getElementById("dateBorn").value = fechaFormateada;
    }
    
    document.getElementById("phoneNumber").value = p.phoneNumber || '';
    document.getElementById("eps").value = p.eps || '';
    document.getElementById("genero").value = p.genero || '';
    document.getElementById("relatedPerson").checked = p.relatedPerson;
  } catch (error) {
    console.error("Error al editar:", error);
    alert("Error al cargar datos para editar");
  }
};

// Eliminar lógico
window.eliminarLogico = async (id) => {
  if (confirm("¿Eliminar lógicamente esta persona?")) {
    try {
      await fetch(`${API_URL}/Logico/${id}`, {
        method: 'PUT'
      });
      alert("Eliminado lógicamente");
      cargarPersonas();
    } catch (error) {
      console.error("Error al eliminar lógicamente:", error);
      alert("Error al eliminar lógicamente");
    }
  }
};

// Eliminar permanente
window.eliminarDefinitivo = async (id) => {
  if (confirm("¿ELIMINAR PERMANENTEMENTE esta persona? Esta acción no se puede deshacer.")) {
    try {
      await fetch(`${API_URL}/permanent/${id}`, {
        method: 'DELETE'
      });
      alert("Eliminado definitivamente");
      cargarPersonas();
    } catch (error) {
      console.error("Error al eliminar permanentemente:", error);
      alert("Error al eliminar permanentemente");
    }
  }
};