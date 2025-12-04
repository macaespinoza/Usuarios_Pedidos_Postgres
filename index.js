// BOOTCAMP FULL STACK JAVASCRIPT 0080
// MÓDULO 07 - Evaluación de Portafolio
// Alumna: Macarena Espinoza Gatica

const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const sequelize = require('./config/database')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// RUTAS
app.use('/usuarios', require('./routes/usuarios'))
app.use('/pedidos', require('./routes/pedidos'))
app.get('/', (req, res) => res.render('home'))

// INICIALIZAR SERVIDOR
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida')
    return sequelize.sync()
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
  })
  .catch(error => console.error('Error al conectar:', error.message))
