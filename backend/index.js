const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de Sequelize (conexión a MySQL)
const sequelize = new Sequelize(
  process.env.DB_NAME || 'laroseta',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

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

// Listener
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});