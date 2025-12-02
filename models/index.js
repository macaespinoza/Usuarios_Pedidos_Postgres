const Usuario = require('./Usuario')
const Pedido = require('./Pedido')

// Un usuario tiene muchos pedidos
Usuario.hasMany(Pedido, {
  foreignKey: 'usuario_id',
  as: 'pedidos'
})

// Un pedido pertenece a un usuario
Pedido.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
})

module.exports = {
  Usuario,
  Pedido
}
