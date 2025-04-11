const apiUrl = "https://localhost:7287/api/Person";

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#rolesTable tbody");
    data.forEach(rol => {
      const row = `<tr><td>${rol.id}</td><td>${rol.nombre}</td></tr>`;
      tbody.innerHTML += row;
    });
  })
  .catch(err => console.error("Error al obtener las personas:", err));
