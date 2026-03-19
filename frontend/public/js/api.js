const base = () => `${window.API_URL}/${window.RESOURCE}`;

export async function getAll() {
  const res = await fetch(base());
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export async function getOne(id) {
  const res = await fetch(`${base()}/${id}`);
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export async function create(data) {
  const res = await fetch(base(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export async function update(id, data) {
  const res = await fetch(`${base()}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export async function remove(id) {
  const res = await fetch(`${base()}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`${res.status}`);
}
