# Tienda Online - Sistema de Gestión

Aplicación web para gestionar usuarios y pedidos con Node.js, Express, PostgreSQL y Handlebars.

## Tecnologías

- **Backend**: Node.js + Express
- **Base de Datos**: PostgreSQL + Sequelize ORM
- **Frontend**: Handlebars + Bootstrap 5 (Dark Mode)
- **Variables de Entorno**: dotenv

## Instalación

1. Clonar repositorio

2. Instalar dependencias:
```bash
npm install
```

3. Crear base de datos:
```bash
psql -U postgres -f database.sql
```

4. Configurar `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tienda_online
DB_USER=postgres
DB_PASSWORD=tu_contraseña
PORT=3000
```

5. Iniciar servidor:
```bash
npm start
```

## Estructura

```
├── config/
│   └── database.js         # Configuración Sequelize
├── models/
│   ├── Usuario.js          # Modelo Usuario
│   ├── Pedido.js           # Modelo Pedido
│   └── index.js            # Relaciones
├── routes/
│   ├── usuarios.js         # Rutas usuarios
│   └── pedidos.js          # Rutas pedidos
├── views/
│   ├── layouts/
│   │   └── main.handlebars # Layout principal
│   ├── usuarios/
│   │   ├── index.handlebars
│   │   └── pedidos.handlebars
│   ├── pedidos/
│   │   └── index.handlebars
│   └── home.handlebars
├── index.js                # Servidor principal
└── database.sql            # Script BD
```

## Rutas

### Vistas
- `GET /` - Página principal
- `GET /usuarios` - Lista de usuarios
- `GET /usuarios/:id/pedidos` - Pedidos de un usuario
- `GET /pedidos` - Lista de pedidos

### API Usuarios
- `POST /usuarios/api` - Crear usuario
- `PUT /usuarios/api/:id` - Actualizar usuario
- `DELETE /usuarios/api/:id` - Eliminar usuario
- `GET /usuarios/api/:id/pedidos` - Obtener pedidos

### API Pedidos
- `POST /pedidos/api` - Crear pedido
- `GET /pedidos/api` - Obtener todos los pedidos

## Funcionalidades

### Gestión de Usuarios
- Crear, editar y eliminar usuarios
- Validación de email único
- Contraseña mínima 6 caracteres
- Ver pedidos por usuario

### Gestión de Pedidos
- Crear pedidos asociados a usuarios
- Selector de usuario con dropdown
- Validación de cantidad mínima
- Transacciones para integridad de datos

## Base de Datos

### Tabla usuarios
- `id`: Serial (PK)
- `nombre`: VARCHAR(100)
- `email`: VARCHAR(100) UNIQUE
- `password`: VARCHAR(255)

### Tabla pedidos
- `id`: Serial (PK)
- `usuario_id`: INTEGER (FK)
- `producto`: VARCHAR(200)
- `cantidad`: INTEGER
- `fecha_pedido`: TIMESTAMP

**Relación**: Un usuario puede tener muchos pedidos (ON DELETE CASCADE)
