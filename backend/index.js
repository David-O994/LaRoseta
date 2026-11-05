const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { sequelize, Pedido, DetallePedido } = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => console.log('Modelos sincronizados con la base de datos'))
  .catch(err => console.error('Error al sincronizar modelos:', err));

// Ruta POST para recibir pedidos
app.post('/api/pedidos', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { fechaPedido, total, cliente, productos, observaciones } = req.body;

    // Crear el pedido
    const nuevoPedido = await Pedido.create({
      fechaPedido,
      total,
      nombreCliente: cliente.nombre,
      emailCliente: cliente.email,
      telefonoCliente: cliente.telefono,
      direccionDespacho: cliente.direccionDespacho,
      observaciones,
      estado: 'Pendiente'
    }, { transaction: t });

    // Crear los detalles del pedido
    const detalles = productos.map(p => ({
      PedidoId: nuevoPedido.id,
      idProducto: p.idProducto,
      nombreProducto: p.nombre,
      cantidad: p.cantidad,
      precioUnitario: p.precio,
      subtotal: p.subtotal
    }));

    await DetallePedido.bulkCreate(detalles, { transaction: t });

    await t.commit();
    res.status(201).json({ success: true, message: 'Pedido creado correctamente', data: nuevoPedido });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear pedido:', error);
    res.status(500).json({ success: false, error: 'Error al procesar el pedido', details: error.message });
  }
});

// Ruta de prueba para verificar la conexión
app.get('/api/test', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'success', message: 'Conectado a MySQL con Sequelize correctamente 🌹' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo conectar a la base de datos', details: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de La Roseta corriendo en el puerto ${PORT}`);
});