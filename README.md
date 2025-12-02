# Tienda Online API

API REST para gestionar usuarios y pedidos con Node.js, Express, Sequelize y PostgreSQL.

## Requisitos

- Node.js
- PostgreSQL

## Instalación

1. Clonar el repositorio

2. Instalar dependencias:
```bash
npm install
```

3. Crear la base de datos en PostgreSQL:
```bash
psql -U postgres -f database.sql
```

4. Configurar variables de entorno en `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tienda_online
DB_USER=postgres
DB_PASSWORD=tu_contraseña
PORT=3000
```

5. Iniciar el servidor:
```bash
npm start
```

## Endpoints

### Usuarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /usuarios | Crear usuario |
| GET | /usuarios | Obtener todos los usuarios |
| PUT | /usuarios/:id | Actualizar usuario |
| DELETE | /usuarios/:id | Eliminar usuario |
| GET | /usuarios/:id/pedidos | Obtener pedidos de un usuario |

### Pedidos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /pedidos | Crear pedido |
| GET | /pedidos | Obtener todos los pedidos |

## Ejemplos de uso con Postman

### Crear usuario
```json
POST /usuarios
{
  "nombre": "Ana Torres",
  "email": "ana@email.com",
  "contraseña": "password123"
}
```

### Crear pedido
```json
POST /pedidos
{
  "usuario_id": 1,
  "producto": "Auriculares",
  "cantidad": 2
}
```
