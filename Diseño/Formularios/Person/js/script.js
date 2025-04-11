const apiUrl = "https://localhost:7287/api/Person";

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#personsTable tbody");
    data.forEach(person => {
      const row = `<tr><td>${person.id}</td><td>${person.FirstName}</td></tr>${person.LastName}</td><tr>`;
      tbody.innerHTML += row;
    });
  })
  .catch(err => console.error("Error al obtener las personas:", err));
