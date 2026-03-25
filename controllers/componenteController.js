const { Componente, Producto } = require("../models");

module.exports = {
  // GET /componentes
  getAll: async (req, res) => {
    try {
      const componentes = await Componente.findAll();
      res.json(componentes);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // GET /componentes/:id
  getById: async (req, res) => {
    try {
      const componente = await Componente.findByPk(req.params.id);
      if (!componente)
        return res.status(404).json({ error: "Componente no encontrado" });
      res.json(componente);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // POST /componentes
  create: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      if (!nombre)
        return res.status(400).json({ error: "nombre es requerido" });
      const componente = await Componente.create({ nombre, descripcion });
      res.status(201).json(componente);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  // PUT /componentes/:id
  update: async (req, res) => {
    try {
      const componente = await Componente.findByPk(req.params.id);
      if (!componente)
        return res.status(404).json({ error: "Componente no encontrado" });

      await componente.update(req.body);
      res.json(componente);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // DELETE /componentes/:id
  remove: async (req, res) => {
    try {
      const componente = await Componente.findByPk(req.params.id);
      if (!componente)
        return res.status(404).json({ error: "Componente no encontrado" });

      await componente.destroy();
      res.json({ message: "Componente eliminado correctamente" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  // GET /componentes/:id/productos (REQUERIDO POR EL TP)
  // Devuelve el componente con la lista de productos donde se utiliza
  getProductos: async (req, res) => {
    try {
      const componente = await Componente.findByPk(req.params.id, {
        include: [
          {
            model: Producto,
            as: "productos", // Asegurate que este alias coincida con tu models/index.js
            through: { attributes: [] }, // Limpia el JSON de la tabla intermedia
          },
        ],
      });
      if (!componente)
        return res.status(404).json({ error: "Componente no encontrado" });
      res.json(componente);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
};
