CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    codigo_barras VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    productos_similares VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS productos_vendidos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad_vendida INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ganancias_diarias (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    total_ganado DECIMAL(10, 2) NOT NULL,
    UNIQUE (fecha)
);

INSERT INTO productos (codigo_barras, nombre, cantidad, fecha_vencimiento, precio, productos_similares) 
VALUES ('1234567890123', 'Producto Ejemplo', 100, '2024-12-31', 19.99, 'Producto Similar 1, Producto Similar 2')
ON CONFLICT (codigo_barras) DO NOTHING;

-- borrar productos vendidos
DELETE FROM productos_vendidos;