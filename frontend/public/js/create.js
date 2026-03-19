import { create } from "./api.js";

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  btn.textContent = "Creando...";

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
    await create(payload);
    window.location.href = "index.html";
  } catch (e) {
    document.getElementById("error").textContent = `Error al crear el registro: ${e.message}`;
    document.getElementById("error").classList.remove("hidden");
    btn.disabled = false;
    btn.textContent = "Crear registro";
  }
});
