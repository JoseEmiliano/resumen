const { Router } = require("express");
const componenteController = require("../controllers/componenteController");

const router = Router();

// --- CRUD Básico de Componentes ---
router.get("/",         componenteController.getAll);
router.get("/:id",      componenteController.getById);
router.post("/",        componenteController.create);
router.put("/:id",      componenteController.update);
router.delete("/:id",   componenteController.remove);

// --- Relación: Ver en qué productos se usa este componente ---
router.get("/:id/productos", componenteController.getProductos);

module.exports = router;