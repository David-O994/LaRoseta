const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'laroseta',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

const Pedido = sequelize.define('Pedido', {
  // codigoSeguimiento: { type: DataTypes.STRING, unique: true, allowNull: false }, // trackeo?
  fechaPedido: { type: DataTypes.DATEONLY, allowNull: false },
  estado: { type: DataTypes.STRING, defaultValue: 'Pendiente' },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  nombreCliente: { type: DataTypes.STRING, allowNull: false },
  emailCliente: { type: DataTypes.STRING, allowNull: false },
  telefonoCliente: { type: DataTypes.STRING, allowNull: false },
  direccionDespacho: { type: DataTypes.STRING, allowNull: false },
  observaciones: { type: DataTypes.TEXT }
});

const DetallePedido = sequelize.define('DetallePedido', {
  idProducto: { type: DataTypes.INTEGER, allowNull: false },
  nombreProducto: { type: DataTypes.STRING, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  precioUnitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

// Relaciones
Pedido.hasMany(DetallePedido, { as: 'detalles' });
DetallePedido.belongsTo(Pedido);

module.exports = { sequelize, Pedido, DetallePedido };
