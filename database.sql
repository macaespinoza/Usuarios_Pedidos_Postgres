-- Crear la base de datos
CREATE DATABASE tienda_online;

-- Conectar a la base de datos
\c tienda_online

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    producto VARCHAR(200) NOT NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba
INSERT INTO usuarios (nombre, email, contraseña) VALUES
('Macarena Espinoza', 'macarena@email.com', 'password123'),
('Anyeli Mantilla', 'anyeli@email.com', 'password456'),
('Juan Oh', 'juan@email.com', 'password789');

INSERT INTO pedidos (usuario_id, producto, cantidad) VALUES
(1, 'Laptop HP', 1),
(1, 'Mouse inalámbrico', 2),
(2, 'Teclado mecánico', 1),
(3, 'Monitor 24 pulgadas', 1);
