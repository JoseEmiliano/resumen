const { Router } = require("express");
const fabricanteController = require("../controllers/fabricanteController");

const router = Router();

// --- CRUD Básico de Fabricantes ---
router.get("/", fabricanteController.getAll);
router.get("/:id", fabricanteController.getById);
router.post("/", fabricanteController.create);
router.put("/:id", fabricanteController.update);
router.delete("/:id", fabricanteController.remove);

// --- Relación: Ver productos de un fabricante ---
// Este endpoint incluye los componentes de cada producto (como pide el TP)
router.get("/:id/productos", fabricanteController.getProductos);

module.exports = router;
