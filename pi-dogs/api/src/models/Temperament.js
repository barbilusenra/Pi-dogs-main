const { DataTypes } = require('sequelize');
// Exporto la funcion que define el modelo
// Luego le inyecto la conexion a sequelize
module.exports = (sequelize) => {
    sequelize.define('temperament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    }, {
        timestamp: false,
    }
    );
};