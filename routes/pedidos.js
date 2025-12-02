const express = require('express')
const router = express.Router()
const sequelize = require('../config/database')
const { Usuario, Pedido } = require('../models')

// Rutas de vistas (HTML)
// Obtener todos los pedidos (vista)
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nombre', 'email']
      }
    })
    // Convertir objetos Sequelize a JSON plano
    const pedidosJSON = pedidos.map(p => p.toJSON())
    res.render('pedidos/index', { pedidos: pedidosJSON })
  } catch (error) {
    res.status(500).send('Error al cargar pedidos')
  }
})

// Rutas API (JSON)
// Crear un pedido con transacción
router.post('/api', async (req, res) => {
  const t = await sequelize.transaction()

  try {
    const { usuario_id, producto, cantidad } = req.body

    // Verificar que el usuario existe
    const usuario = await Usuario.findByPk(usuario_id, { transaction: t })
    if (!usuario) {
      await t.rollback()
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    // Crear el pedido dentro de la transacción
    const pedido = await Pedido.create({
      usuario_id,
      producto,
      cantidad
    }, { transaction: t })

    // Confirmar la transacción
    await t.commit()
    res.status(201).json(pedido)
  } catch (error) {
    // Revertir cambios si hay error
    await t.rollback()
    res.status(400).json({ error: error.message })
  }
})

// Obtener todos los pedidos (API)
router.get('/api', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: {
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nombre', 'email']
      }
    })
    res.json(pedidos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
