import { getOne, update } from "./api.js";

const id = new URLSearchParams(window.location.search).get("id");

async function load() {
  try {
    const r = await getOne(id);
    const form = document.getElementById("form");
    form.campo1.value = r.campo1;
    form.campo2.value = r.campo2;
    form.campo3.value = r.campo3;
    form.campo4.value = r.campo4;
    form.campo5.value = r.campo5;
    form.campo6.checked = r.campo6 === true || r.campo6 === "true";
  } catch (e) {
    document.getElementById("error").textContent = `Error al cargar el registro: ${e.message}`;
    document.getElementById("error").classList.remove("hidden");
  }
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.textContent = "Guardando...";

  const data = new FormData(e.target);
  const payload = {
    campo1: data.get("campo1"),
    campo2: data.get("campo2"),
    campo3: data.get("campo3"),
    campo4: parseInt(data.get("campo4"), 10),
    campo5: parseFloat(data.get("campo5")),
    campo6: e.target.campo6.checked,
  };

  try {
    await update(id, payload);
    window.location.href = "index.html";
  } catch (e) {
    document.getElementById("error").textContent = `Error al actualizar: ${e.message}`;
    document.getElementById("error").classList.remove("hidden");
    btn.disabled = false;
    btn.textContent = "Guardar cambios";
  }
});

load();
