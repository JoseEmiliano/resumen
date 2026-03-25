const express = require("express");
const { sequelize } = require("./models"); // Esto busca models/index.js

// Importación de Rutas (Asegurate de que la carpeta 'routes' exista)
const productosRouter = require("./routes/productos");
const fabricantesRouter = require("./routes/fabricantes");
const componentesRouter = require("./routes/componentes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Definición de Rutas
app.use("/productos", productosRouter);
app.use("/fabricantes", fabricantesRouter);
app.use("/componentes", componentesRouter);

// Sincronizar con el Búnker de Postgres y arrancar
sequelize
  .sync({ alter: true }) // 'alter: true' actualiza las tablas si agregás columnas
  .then(() => {
    console.log("✅ Conexión exitosa: Búnker PostgreSQL sincronizado");
    app.listen(PORT, () => {
      console.log(`🚀 API corriendo en puerto ${PORT}`);
      console.log(`🔗 Local: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error fatal al conectar con el búnker:", err);
  });
