const express = require('express')
const router = express.Router()
const sequelize = require('../config/database')
const { Usuario, Pedido } = require('../models')

// VISTAS
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'email'] }
    })
    const usuarios = await Usuario.findAll({ attributes: ['id', 'nombre', 'email'] })

    res.render('pedidos/index', {
      pedidos: pedidos.map(p => p.toJSON()),
      usuarios: usuarios.map(u => u.toJSON())
    })
  } catch (error) {
    res.status(500).send('Error al cargar pedidos')
  }
})

// API
router.post('/api', async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const usuario = await Usuario.findByPk(req.body.usuario_id, { transaction: t })
    if (!usuario) {
      await t.rollback()
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const pedido = await Pedido.create(req.body, { transaction: t })
    await t.commit()
    res.status(201).json(pedido)
  } catch (error) {
    await t.rollback()
    res.status(400).json({ error: error.message })
  }
})

router.get('/api', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: { model: Usuario, as: 'usuario', attributes: ['id', 'nombre', 'email'] }
    })
    res.json(pedidos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
