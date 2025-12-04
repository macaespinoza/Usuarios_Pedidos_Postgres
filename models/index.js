const Usuario = require('./Usuario')
const Pedido = require('./Pedido')

// RELACIONES
Usuario.hasMany(Pedido, { foreignKey: 'usuario_id', as: 'pedidos' })
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' })

module.exports = { Usuario, Pedido }
