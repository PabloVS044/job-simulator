import { getOne } from "./api.js";

const id = new URLSearchParams(window.location.search).get("id");

document.getElementById("resource-label").textContent = window.RESOURCE;
document.getElementById("edit-link").href = `edit.html?id=${id}`;

const LABELS = ["Campo 1", "Campo 2", "Campo 3", "Campo 4", "Campo 5", "Campo 6"];
const KEYS   = ["campo1", "campo2", "campo3", "campo4", "campo5", "campo6"];

async function load() {
  try {
    const r = await getOne(id);

    document.getElementById("card").innerHTML = `
      <div class="flex items-start justify-between mb-8">
        <div>
          <p class="text-xs text-slate-500 uppercase tracking-wider mb-1">ID ${r.id}</p>
          <h1 class="text-2xl font-semibold">${r.campo1}</h1>
        </div>
      </div>
      <dl class="grid grid-cols-2 gap-x-8 gap-y-6">
        ${KEYS.map((k, i) => `
          <div>
            <dt class="text-xs text-slate-500 uppercase tracking-wider mb-1">${LABELS[i]}</dt>
            <dd class="text-slate-200">${
              k === "campo6"
                ? `<span class="px-2 py-0.5 rounded-full text-xs font-medium ${r[k] ? 'bg-emerald-900/50 text-emerald-400' : 'bg-slate-700 text-slate-400'}">${r[k]}</span>`
                : r[k]
            }</dd>
          </div>
        `).join("")}
      </dl>
    `;
  } catch (e) {
    document.getElementById("error").textContent = `Error al cargar el registro: ${e.message}`;
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("card").classList.add("hidden");
  }
}

load();
