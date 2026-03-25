module.exports = (sequelize, DataTypes) => {
  const Fabricante = sequelize.define(
    "Fabricante",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      contacto: {
        type: DataTypes.STRING,
      },
      pathImgPerfil: {
        type: DataTypes.STRING,
      },
    },
    {
      // Estandarización para Postgres:
      tableName: "Fabricantes",
      timestamps: true,
    },
  );

  return Fabricante;
};
