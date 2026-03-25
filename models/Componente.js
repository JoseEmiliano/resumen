module.exports = (sequelize, DataTypes) => {
  const Componente = sequelize.define("Componente", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
  }, {
    // Buenas prácticas de Analista:
    tableName: 'Componentes', // Nombre exacto de la tabla en Postgres
    timestamps: true          // Crea automáticamente createdAt y updatedAt
  });

  return Componente;
};