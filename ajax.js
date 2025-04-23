const API_URL = "https://kom-andras.github.io/web_eloadas/demo_sse.php";

function readData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const out = data.map(d => `ID: ${d.id}, Név: ${d.name}, Magasság: ${d.height}`).join("<br>");
      document.getElementById("output").innerHTML = out;

      const heights = data.map(d => Number(d.height));
      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);

      document.getElementById("summary").innerHTML = `Összeg: ${sum}, Átlag: ${avg}, Max: ${max}`;
    });
}

function validate(name, height) {
  if (!name || !height) return "Nem lehet üres!";
  if (name.length > 30 || height.length > 30) return "Túl hosszú!";
  return null;
}

function createData() {
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const error = validate(name, height);
  if (error) return showMsg(error, true);

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, height })
  }).then(() => showMsg("Sikeres létrehozás!"));
}

function getDataForId() {
  const id = document.getElementById("id").value;
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("name").value = data.name;
      document.getElementById("height").value = data.height;
    });
}

function updateData() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const error = validate(name, height);
  if (error) return showMsg(error, true);

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, height })
  }).then(() => showMsg("Sikeres frissítés!"));
}

function deleteData() {
  const id = document.getElementById("deleteId").value;
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => showMsg("Törlés sikeres!"));
}

function showMsg(msg, isError = false) {
  const div = document.getElementById("msg");
  div.textContent = msg;
  div.style.color = isError ? "red" : "green";
}
