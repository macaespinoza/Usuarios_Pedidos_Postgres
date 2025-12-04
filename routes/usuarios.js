const express = require('express')
const router = express.Router()
const { Usuario, Pedido } = require('../models')

// VISTAS
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.render('usuarios/index', { usuarios: usuarios.map(u => u.toJSON()) })
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
    res.status(500).send('Error al cargar usuarios: ' + error.message)
  }
})

router.get('/:id/pedidos', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: { model: Pedido, as: 'pedidos' }
    })
    if (!usuario) return res.status(404).send('Usuario no encontrado')

    res.render('usuarios/pedidos', {
      usuario: usuario.toJSON(),
      pedidos: usuario.pedidos.map(p => p.toJSON())
    })
  } catch (error) {
    res.status(500).send('Error al cargar pedidos')
  }
})

// API
router.post('/api', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body)
    res.status(201).json(usuario)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(400).json({ error: error.message })
  }
})

router.put('/api/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    await usuario.update(req.body)
    res.json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/api/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    await usuario.destroy()
    res.json({ mensaje: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/api/:id/pedidos', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: { model: Pedido, as: 'pedidos' }
    })
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.json(usuario.pedidos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
