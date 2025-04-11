// Script para gestionar CRUD de Usuarios
document.addEventListener("DOMContentLoaded", cargarUsuarios);

// URL base específica para User
const API_URL = 'https://localhost:7287/api/User';

// Evento submit para crear o actualizar
document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("userId").value) || 0;

  const user = {
    id,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    active: document.getElementById("active").checked,
    personId: parseInt(document.getElementById("personId").value),
    registrationDate: document.getElementById("registrationDate").value || new Date().toISOString()
  };

  try {
    const method = id > 0 ? 'PUT' : 'POST';
    const url = id > 0 ? `${API_URL}/${id}` : API_URL;

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error desconocido");
    }

    alert(id > 0 ? "Usuario actualizado correctamente" : "Usuario registrado correctamente");

    this.reset();
    document.getElementById("userId").value = "";
    cargarUsuarios();

  } catch (err) {
    console.error("Error al guardar usuario:", err);
    alert("Error al guardar usuario");
  }
});

// Cargar todos los usuarios
async function cargarUsuarios() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = "";
    
    data.forEach(u => {
      const fila = `<tr>
        <td>${u.id}</td>
        <td>${u.email || ''}</td>
        <td>********</td> <!-- Ocultar contraseña por seguridad -->
        <td>${u.active ? 'Sí' : 'No'}</td>
        <td>${u.personId || ''}</td>
        <td>${formatDate(u.registrationDate)}</td>
        <td>
          <button onclick="editarUsuario(${u.id})" class="btn btn-warning btn-sm">Editar</button>
          <button onclick="eliminarLogico(${u.id})" class="btn btn-secondary btn-sm">Eliminar Lógico</button>
          <button onclick="eliminarDefinitivo(${u.id})" class="btn btn-danger btn-sm">Eliminar Permanente</button>
        </td>
      </tr>`;
      tbody.innerHTML += fila;
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    alert("Error al cargar usuarios");
  }
}

// Formatear fecha para mostrar
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Editar usuario
window.editarUsuario = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const u = await response.json();
    
    document.getElementById("userId").value = u.id;
    document.getElementById("email").value = u.email || '';
    document.getElementById("password").value = ''; // Por seguridad, no mostrar contraseña
    document.getElementById("active").checked = u.active;
    document.getElementById("personId").value = u.personId || '';
    
    // Formatear fecha
    if (u.registrationDate) {
      const fecha = new Date(u.registrationDate);
      const fechaFormateada = fecha.toISOString().split('T')[0];
      document.getElementById("registrationDate").value = fechaFormateada;
    }
  } catch (error) {
    console.error("Error al editar:", error);
    alert("Error al cargar datos para editar");
  }
};

// Eliminar lógico
window.eliminarLogico = async (id) => {
  if (confirm("¿Eliminar lógicamente este usuario?")) {
    try {
      await fetch(`${API_URL}/Logico/${id}`, {
        method: 'PUT'
      });
      alert("Eliminado lógicamente");
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar lógicamente:", error);
      alert("Error al eliminar lógicamente");
    }
  }
};

// Eliminar permanente
window.eliminarDefinitivo = async (id) => {
  if (confirm("¿ELIMINAR PERMANENTEMENTE este usuario? Esta acción no se puede deshacer.")) {
    try {
      await fetch(`${API_URL}/permanent/${id}`, {
        method: 'DELETE'
      });
      alert("Eliminado definitivamente");
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar permanentemente:", error);
      alert("Error al eliminar permanentemente");
    }
  }
};