import { getAll, remove } from "./api.js";

document.getElementById("resource-label").textContent = window.RESOURCE;

async function load() {
  try {
    const records = await getAll();
    const tbody = document.getElementById("records");
    const empty = document.getElementById("empty");

    if (records.length === 0) {
      empty.classList.remove("hidden");
      return;
    }

    records.forEach(r => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-800/50 transition-colors";
      tr.innerHTML = `
        <td class="px-6 py-4 text-slate-500 text-sm">${r.id}</td>
        <td class="px-6 py-4 font-medium">${r.campo1}</td>
        <td class="px-6 py-4 text-slate-300">${r.campo2}</td>
        <td class="px-6 py-4 text-slate-300">${r.campo3}</td>
        <td class="px-6 py-4 text-slate-300">${r.campo4}</td>
        <td class="px-6 py-4 text-slate-300">${r.campo5}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-0.5 rounded-full text-xs font-medium ${r.campo6 ? 'bg-emerald-900/50 text-emerald-400' : 'bg-slate-700 text-slate-400'}">
            ${r.campo6}
          </span>
        </td>
        <td class="px-6 py-4">
          <div class="flex items-center justify-end gap-2">
            <a href="show.html?id=${r.id}" class="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-md border border-slate-700 hover:border-slate-500">Ver</a>
            <a href="edit.html?id=${r.id}" class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-1.5 rounded-md border border-indigo-900 hover:border-indigo-600">Editar</a>
            <button data-id="${r.id}" class="delete-btn text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-md border border-red-900 hover:border-red-700">Eliminar</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("¿Eliminar este registro?")) return;
        try {
          await remove(btn.dataset.id);
          location.reload();
        } catch (e) {
          showError(`Error al eliminar: ${e.message}`);
        }
      });
    });
  } catch (e) {
    showError(`Error al cargar los registros: ${e.message}`);
  }
}

function showError(msg) {
  const el = document.getElementById("error");
  el.textContent = msg;
  el.classList.remove("hidden");
}

load();
