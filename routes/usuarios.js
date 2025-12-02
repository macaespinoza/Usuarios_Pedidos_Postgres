const express = require('express')
const router = express.Router()
const { Usuario, Pedido } = require('../models')

// Rutas de vistas (HTML)
// Obtener todos los usuarios (vista)
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    const usuariosJSON = usuarios.map(u => u.toJSON())
    console.log('Usuarios encontrados:', usuariosJSON.length)
    console.log('Datos de usuarios:', JSON.stringify(usuariosJSON, null, 2))
    res.render('usuarios/index', { usuarios: usuariosJSON })
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
    res.status(500).send('Error al cargar usuarios: ' + error.message)
  }
})

// Obtener pedidos de un usuario específico (vista)
router.get('/:id/pedidos', async (req, res) => {
  try {
    const { id } = req.params

    const usuario = await Usuario.findByPk(id, {
      include: {
        model: Pedido,
        as: 'pedidos'
      }
    })

    if (!usuario) {
      return res.status(404).send('Usuario no encontrado')
    }

    // Convertir objetos Sequelize a JSON plano
    const usuarioJSON = usuario.toJSON()
    const pedidosJSON = usuario.pedidos.map(p => p.toJSON())

    res.render('usuarios/pedidos', {
      usuario: usuarioJSON,
      pedidos: pedidosJSON
    })
  } catch (error) {
    res.status(500).send('Error al cargar pedidos')
  }
})

// Rutas API (JSON)
// Crear un usuario
router.post('/api', async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body
    const usuario = await Usuario.create({ nombre, email, contraseña })
    res.status(201).json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Actualizar un usuario
router.put('/api/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, email, contraseña } = req.body

    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    await usuario.update({ nombre, email, contraseña })
    res.json(usuario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Eliminar un usuario
router.delete('/api/:id', async (req, res) => {
  try {
    const { id } = req.params

    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    await usuario.destroy()
    res.json({ mensaje: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Obtener pedidos de un usuario específico (API)
router.get('/api/:id/pedidos', async (req, res) => {
  try {
    const { id } = req.params

    const usuario = await Usuario.findByPk(id, {
      include: {
        model: Pedido,
        as: 'pedidos'
      }
    })

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json(usuario.pedidos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
