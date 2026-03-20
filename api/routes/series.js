const { Router } = require("express");
const pool = require("../db");

const router = Router();

// GET /series
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, titulo AS campo1, genero AS campo2, plataforma AS campo3, temporadas AS campo4, calificacion AS campo5, en_emision AS campo6 FROM series ORDER BY id"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las series" });
  }
});

// GET /series/:id
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, titulo AS campo1, genero AS campo2, plataforma AS campo3, temporadas AS campo4, calificacion AS campo5, en_emision AS campo6 FROM series WHERE id = $1",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la serie" });
  }
});

// Validación
function validate(body, partial = false) {
  const errors = [];

  if (!partial || body.campo1 !== undefined) {
    if (body.campo1 === undefined || body.campo1 === null || typeof body.campo1 !== "string" || body.campo1.trim() === "") {
      errors.push("campo1 es requerido y debe ser string");
    }
  }

  if (!partial || body.campo2 !== undefined) {
    if (body.campo2 === undefined || body.campo2 === null || typeof body.campo2 !== "string" || body.campo2.trim() === "") {
      errors.push("campo2 es requerido y debe ser string");
    }
  }

  if (!partial || body.campo3 !== undefined) {
    if (body.campo3 === undefined || body.campo3 === null || typeof body.campo3 !== "string" || body.campo3.trim() === "") {
      errors.push("campo3 es requerido y debe ser string");
    }
  }

  if (!partial || body.campo4 !== undefined) {
    if (body.campo4 === undefined || body.campo4 === null || typeof body.campo4 !== "number" || !Number.isInteger(body.campo4)) {
      errors.push("campo4 es requerido y debe ser integer");
    }
  }

  if (!partial || body.campo5 !== undefined) {
    if (body.campo5 === undefined || body.campo5 === null || typeof body.campo5 !== "number") {
      errors.push("campo5 es requerido y debe ser float");
    }
  }

  if (!partial || body.campo6 !== undefined) {
    if (body.campo6 === undefined || body.campo6 === null || typeof body.campo6 !== "boolean") {
      errors.push("campo6 es requerido y debe ser boolean");
    }
  }

  return errors;
}

// POST /series
router.post("/", async (req, res) => {
  const errors = validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO series (titulo, genero, plataforma, temporadas, calificacion, en_emision) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, titulo AS campo1, genero AS campo2, plataforma AS campo3, temporadas AS campo4, calificacion AS campo5, en_emision AS campo6",
      [campo1, campo2, campo3, campo4, campo5, campo6]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear la serie" });
  }
});

// PUT /series/:id
router.put("/:id", async (req, res) => {
  const errors = validate(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;
    const { rows } = await pool.query(
      "UPDATE series SET titulo = $1, genero = $2, plataforma = $3, temporadas = $4, calificacion = $5, en_emision = $6 WHERE id = $7 RETURNING id, titulo AS campo1, genero AS campo2, plataforma AS campo3, temporadas AS campo4, calificacion AS campo5, en_emision AS campo6",
      [campo1, campo2, campo3, campo4, campo5, campo6, req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la serie" });
  }
});

// PATCH /series/:id
router.patch("/:id", async (req, res) => {
  const errors = validate(req.body, true);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const fieldMap = {
    campo1: "titulo",
    campo2: "genero",
    campo3: "plataforma",
    campo4: "temporadas",
    campo5: "calificacion",
    campo6: "en_emision",
  };

  const sets = [];
  const values = [];
  let i = 1;

  for (const [campo, column] of Object.entries(fieldMap)) {
    if (req.body[campo] !== undefined) {
      sets.push(`${column} = $${i}`);
      values.push(req.body[campo]);
      i++;
    }
  }

  if (sets.length === 0) {
    return res.status(400).json({ error: "No se enviaron campos para actualizar" });
  }

  values.push(req.params.id);

  try {
    const { rows } = await pool.query(
      `UPDATE series SET ${sets.join(", ")} WHERE id = $${i} RETURNING id, titulo AS campo1, genero AS campo2, plataforma AS campo3, temporadas AS campo4, calificacion AS campo5, en_emision AS campo6`,
      values
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la serie" });
  }
});

// DELETE /series/:id
router.delete("/:id", async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM series WHERE id = $1",
      [req.params.id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ error: "Serie no encontrada" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la serie" });
  }
});

module.exports = router;
