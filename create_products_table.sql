CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    codigo_barras VARCHAR(50) UNIQUE NOT NULL,
    descripción VARCHAR(100) NOT NULL,
    sabor VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    ganancia DECIMAL(10, 2) NOT NULL,
    empresa_dist VARCHAR(50) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
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

INSERT INTO productos (codigo_barras, descripción, sabor, marca, cantidad, precio, costo, ganancia, empresa_dist, fecha_vencimiento, productos_similares) VALUES
('123456789', 'Coca Cola', 'Original', 'Coca Cola', 100, 15.00, 10.00, 5.00, 'Coca Cola', '2021-12-31', 'Pepsi'),
('987654321', 'Pepsi', 'Original', 'Pepsi', 100, 15.00, 10.00, 5.00, 'Pepsi', '2021-12-31', 'Coca Cola');

-- borrar productos vendidos
DELETE FROM productos_vendidos;