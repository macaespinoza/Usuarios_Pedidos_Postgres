const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const sequelize = require('./config/database')
require('dotenv').config()

const usuariosRoutes = require('./routes/usuarios')
const pedidosRoutes = require('./routes/pedidos')

const app = express()
const PORT = process.env.PORT || 3000

// Configurar Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas
app.use('/usuarios', usuariosRoutes)
app.use('/pedidos', pedidosRoutes)

// Ruta principal
app.get('/', (req, res) => {
  res.render('home')
})

// Conectar a la base de datos y levantar servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida')
    return sequelize.sync()
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
  })
  .catch(error => {
    console.error('Error al conectar:', error.message)
  })
