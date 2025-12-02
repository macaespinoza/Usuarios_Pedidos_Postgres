# Tienda Online

Aplicación web para gestionar usuarios y pedidos con Node.js, Express, Sequelize, PostgreSQL, Handlebars y Bootstrap (modo dark).

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

## Interfaz Web

La aplicación incluye una interfaz web completa con Bootstrap en modo dark:

- **`/`** - Página principal con acceso a usuarios y pedidos
- **`/usuarios`** - Lista de usuarios con opciones para crear, editar y eliminar
- **`/usuarios/:id/pedidos`** - Ver pedidos de un usuario específico
- **`/pedidos`** - Lista de todos los pedidos con opción para crear nuevos

Todas las vistas utilizan Bootstrap 5.3.2 en modo dark con Handlebars como motor de plantillas.

## API REST - Endpoints

### Usuarios

| Método | Ruta | Descripción | Tipo |
|--------|------|-------------|------|
| GET | /usuarios | Ver lista de usuarios | Vista HTML |
| GET | /usuarios/:id/pedidos | Ver pedidos de un usuario | Vista HTML |
| POST | /usuarios/api | Crear usuario | JSON |
| PUT | /usuarios/api/:id | Actualizar usuario | JSON |
| DELETE | /usuarios/api/:id | Eliminar usuario | JSON |
| GET | /usuarios/api/:id/pedidos | Obtener pedidos de un usuario | JSON |

### Pedidos

| Método | Ruta | Descripción | Tipo |
|--------|------|-------------|------|
| GET | /pedidos | Ver lista de pedidos | Vista HTML |
| POST | /pedidos/api | Crear pedido | JSON |
| GET | /pedidos/api | Obtener todos los pedidos | JSON |

## Ejemplos de uso con la API

### Crear usuario
```bash
POST /usuarios/api
Content-Type: application/json

{
  "nombre": "Ana Torres",
  "email": "ana@email.com",
  "contraseña": "password123"
}
```

### Crear pedido
```bash
POST /pedidos/api
Content-Type: application/json

{
  "usuario_id": 1,
  "producto": "Auriculares",
  "cantidad": 2
}
```

### Actualizar usuario
```bash
PUT /usuarios/api/1
Content-Type: application/json

{
  "nombre": "Ana Torres Actualizado",
  "email": "ana.torres@email.com"
}
```

### Eliminar usuario
```bash
DELETE /usuarios/api/1
```
