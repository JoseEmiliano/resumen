const { Producto, Fabricante, Componente } = require("../models");

module.exports = {
  // GET /productos - Trae todo el catálogo con sus asociaciones
  getAll: async (req, res) => {
    try {
      const productos = await Producto.findAll({
        include: [
          {
            model: Fabricante,
            as: "fabricantes",
            through: { attributes: [] },
          },
          {
            model: Componente,
            as: "componentes",
            through: { attributes: [] },
          },
        ],
      });
      res.json(productos);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // GET /productos/:id
  getById: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id, {
        include: [
          { model: Fabricante, as: "fabricantes", through: { attributes: [] } },
          { model: Componente, as: "componentes", through: { attributes: [] } },
        ],
      });
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });
      res.json(producto);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // POST /productos
  create: async (req, res) => {
    try {
      const { nombre, descripcion, precio, pathImg } = req.body;
      if (!nombre || precio === undefined) {
        return res
          .status(400)
          .json({ error: "nombre y precio son requeridos" });
      }
      const producto = await Producto.create({
        nombre,
        descripcion,
        precio,
        pathImg,
      });
      res.status(201).json(producto);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  // PUT /productos/:id
  update: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });

      await producto.update(req.body);
      res.json(producto);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // DELETE /productos/:id
  remove: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });

      await producto.destroy();
      res.json({ message: "Producto eliminado correctamente" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // POST /productos/:id/fabricantes
  addFabricantes: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });

      const { fabricantesIds } = req.body;
      if (!fabricantesIds || !Array.isArray(fabricantesIds)) {
        return res
          .status(400)
          .json({ error: "fabricantesIds debe ser un array" });
      }

      const fabricantes = await Fabricante.findAll({
        where: { id: fabricantesIds },
      });
      await producto.addFabricantes(fabricantes);
      res.status(201).json({ message: "Fabricantes asociados correctamente" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // GET /productos/:id/fabricantes
  getFabricantes: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id, {
        include: [
          {
            model: Fabricante,
            as: "fabricantes",
            through: { attributes: [] },
          },
        ],
      });
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });
      res.json(producto);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // POST /productos/:id/componentes
  addComponentes: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });

      const { componentesIds } = req.body;
      if (!componentesIds || !Array.isArray(componentesIds)) {
        return res
          .status(400)
          .json({ error: "componentesIds debe ser un array" });
      }

      const componentes = await Componente.findAll({
        where: { id: componentesIds },
      });
      await producto.addComponentes(componentes);
      res.status(201).json({ message: "Componentes asociados correctamente" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // GET /productos/:id/componentes
  getComponentes: async (req, res) => {
    try {
      const producto = await Producto.findByPk(req.params.id, {
        include: [
          {
            model: Componente,
            as: "componentes",
            through: { attributes: [] },
          },
        ],
      });
      if (!producto)
        return res.status(404).json({ error: "Producto no encontrado" });
      res.json(producto);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
};
