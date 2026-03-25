const { Router } = require("express");
const productoController = require("../controllers/productoController");

const router = Router();

// --- CRUD Básico ---
router.get("/", productoController.getAll);
router.get("/:id", productoController.getById);
router.post("/", productoController.create);
router.put("/:id", productoController.update);
router.delete("/:id", productoController.remove);

// --- Asociaciones M:N (Fabricantes) ---
router.post("/:id/fabricantes", productoController.addFabricantes);
router.get("/:id/fabricantes", productoController.getFabricantes);

// --- Asociaciones M:N (Componentes) ---
router.post("/:id/componentes", productoController.addComponentes);
router.get("/:id/componentes", productoController.getComponentes);

module.exports = router;
