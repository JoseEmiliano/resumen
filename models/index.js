const { Sequelize, DataTypes } = require("sequelize");
// Leemos la configuración que creamos en la carpeta config
const config = require("../config/config.json").development;

// ── Conexión PostgreSQL (Dinámica) ───────────────────────────────────────────
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect, // Esto ahora dirá 'postgres'
    logging: false,
  },
);

// ── Modelos ────────────────────────────────────────────────────────────────────
// Pasamos sequelize y DataTypes para que los modelos sean compatibles
const Producto = require("./Producto")(sequelize, DataTypes);
const Fabricante = require("./Fabricante")(sequelize, DataTypes);
const Componente = require("./Componente")(sequelize, DataTypes);

// ── Asociaciones N:M ───────────────────────────────────────────────────────────

// Producto <-> Fabricante
Producto.belongsToMany(Fabricante, {
  through: "ProductoFabricante",
  as: "fabricantes",
});
Fabricante.belongsToMany(Producto, {
  through: "ProductoFabricante",
  as: "productos",
});

// Producto <-> Componente
Producto.belongsToMany(Componente, {
  through: "ProductoComponente",
  as: "componentes",
});
Componente.belongsToMany(Producto, {
  through: "ProductoComponente",
  as: "productos",
});

module.exports = { sequelize, Producto, Fabricante, Componente };
