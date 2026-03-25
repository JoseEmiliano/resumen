const { Fabricante, Producto, Componente } = require("../models");

// GET /fabricantes
const getAll = async (req, res) => {
  try {
    const fabricantes = await Fabricante.findAll();
    res.json(fabricantes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /fabricantes/:id
const getById = async (req, res) => {
  try {
    const fabricante = await Fabricante.findByPk(req.params.id);
    if (!fabricante)
      return res.status(404).json({ error: "Fabricante no encontrado" });
    res.json(fabricante);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// POST /fabricantes
const create = async (req, res) => {
  try {
    const { nombre, direccion, contacto, pathImgPerfil } = req.body;
    if (!nombre) return res.status(400).json({ error: "nombre es requerido" });
    const fabricante = await Fabricante.create({
      nombre,
      direccion,
      contacto,
      pathImgPerfil,
    });
    res.status(201).json(fabricante);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// PUT /fabricantes/:id
const update = async (req, res) => {
  try {
    const fabricante = await Fabricante.findByPk(req.params.id);
    if (!fabricante)
      return res.status(404).json({ error: "Fabricante no encontrado" });
    await fabricante.update(req.body);
    res.json(fabricante);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// DELETE /fabricantes/:id
const remove = async (req, res) => {
  try {
    const fabricante = await Fabricante.findByPk(req.params.id);
    if (!fabricante)
      return res.status(404).json({ error: "Fabricante no encontrado" });
    await fabricante.destroy();
    res.json({ message: "Fabricante eliminado correctamente" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /fabricantes/:id/productos (INCLUYE COMPONENTES)
// Este es el endpoint estrella del TP
const getProductos = async (req, res) => {
  try {
    const fabricante = await Fabricante.findByPk(req.params.id, {
      include: [
        {
          model: Producto,
          as: "productos",
          through: { attributes: [] }, // Limpia la tabla intermedia ProductoFabricante
          include: [
            {
              model: Componente,
              as: "componentes",
              through: { attributes: [] }, // Limpia la tabla intermedia ProductoComponente
            },
          ],
        },
      ],
    });
    if (!fabricante)
      return res.status(404).json({ error: "Fabricante no encontrado" });
    res.json(fabricante);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getAll, getById, create, update, remove, getProductos };
