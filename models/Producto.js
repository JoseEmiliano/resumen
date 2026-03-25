module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    "Producto",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pathImg: {
        type: DataTypes.STRING,
      },
    },
    {
      // Estandarización para el búnker:
      tableName: "Productos",
      timestamps: true,
    },
  );

  return Producto;
};
