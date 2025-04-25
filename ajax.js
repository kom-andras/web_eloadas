const API_URL = "https://kom-andras.github.io/web_eloadas/ajaxapi.php";
const CODE = "UA5ECLefg456";

function readData() {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      op: "read",
      code: CODE
    })
  })
    .then(res => res.json())
    .then(data => {
      const out = data.list.map(d => `ID: ${d.id}, Név: ${d.name}, Magasság: ${d.height}`).join("<br>");
      document.getElementById("output").innerHTML = out;

      const heights = data.list.map(d => Number(d.height));
      const sum = heights.reduce((a, b) => a + b, 0);
      const avg = (sum / heights.length).toFixed(2);
      const max = Math.max(...heights);

      document.getElementById("summary").innerHTML = `Összeg: ${sum}, Átlag: ${avg}, Max: ${max}`;
    });
}

function validate(name, height, weight) {
  if (!name || !height || !weight) return "Nem lehet üres!";
  if (name.length > 30 || height.length > 30 || weight.length > 30) return "Túl hosszú!";
  return null;
}


function createData() {
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const error = validate(name, height);
  if (error) return showMsg(error, true);

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      op: "create",
      name,
      height,
      weight,
      code: CODE
    })
  }).then(res => res.json())
    .then(() => showMsg("Sikeres létrehozás!"))
    .catch(err => showMsg("Hiba a kérés közben: " + err.message, true));
}

function updateData() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const error = validate(name, height);
  if (error) return showMsg(error, true);

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      op: "update",
      id,
      name,
      height,
      weight,
      code: CODE
    })
  }).then(res => res.json())
    .then(() => showMsg("Sikeres frissítés!"));
}

function deleteData() {
  const id = document.getElementById("deleteId").value;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      op: "delete",
      id,
      code: CODE
    })
  }).then(res => res.json())
    .then(() => showMsg("Törlés sikeres!"));
}

function showMsg(msg, isError = false) {
  const div = document.getElementById("msg");
  div.textContent = msg;
  div.style.color = isError ? "red" : "green";
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