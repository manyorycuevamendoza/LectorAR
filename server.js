require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Configurar body-parser para manejar solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl:{
        rejectUnauthorized: false, // Para evitar errores de certificado SSL
    },
});

// Verificar la conexión a la base de datos
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error adquiriendo cliente', err.stack);
    }
    console.log('Conectado a la base de datos');
    release();
});

// Simulación de productos vendidos
const soldProducts = [
    { nombre: 'Producto A', cantidad_vendida: 3, precio: 10.00 },
    { nombre: 'Producto B', cantidad_vendida: 2, precio: 15.00 }
];

// Ruta para obtener producto por código de barras
app.get('/product/:barcode', async (req, res) => {
    const barcode = req.params.barcode;
    try {
        const result = await pool.query('SELECT descripcion, sabor, cantidad, precio FROM productos WHERE codigo_barras = $1', [barcode]);
        if (result.rows.length > 0) {
            const product = result.rows[0];
            res.json({
                descripcion: product.descripcion,
                sabor: product.sabor,
                cantidad: product.cantidad,
                precio: product.precio
            });
        } else {
            res.json(null);
        }
    } catch (err) {
        console.error('Error al obtener el producto', err);
        res.status(500).send('Error al obtener el producto');
    }
});

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los productos');
    }
});

// Ruta para obtener y mostrar los datos de la tabla productos
app.get('/show-products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        console.log(result.rows); // Mostrar los datos en la terminal
        res.json(result.rows); // Devolver los datos como respuesta
    } catch (err) {
        console.error('Error al obtener los productos', err);
        res.status(500).send('Error al obtener los productos');
    }
});

// Ruta para finalizar la venta y agregar productos vendidos a la base de datos
app.post('/finalize-sale', async (req, res) => {
    const soldProducts = req.body;
    let totalGanadoHoy = 0;
    try {
        for (const product of soldProducts) {
            await pool.query(
                'INSERT INTO productos_vendidos (nombre, cantidad_vendida, precio, total) VALUES ($1, $2, $3, $4)',
                [product.name, product.quantity, product.price, product.total]
            );
            totalGanadoHoy += product.total;
        }

        const today = new Date().toISOString().split('T')[0];
        await pool.query(
            'INSERT INTO ganancias_diarias (fecha, total_ganado) VALUES ($1, $2) ON CONFLICT (fecha) DO UPDATE SET total_ganado = ganancias_diarias.total_ganado + $2',
            [today, totalGanadoHoy]
        );

        res.status(200).send('Venta finalizada y productos agregados a la base de datos');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al finalizar la venta');
    }
});

// Ruta para obtener los productos vendidos
app.get('/sold-products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos_vendidos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los productos vendidos');
    }
});

// Ruta para obtener las ganancias diarias
app.get('/daily-earnings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ganancias_diarias ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las ganancias diarias');
    }
});

// Ruta para obtener la ganancia total del día
app.get('/today-earnings', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const result = await pool.query('SELECT total_ganado FROM ganancias_diarias WHERE fecha = $1', [today]);
        const totalGanadoHoy = result.rows.length > 0 ? result.rows[0].total_ganado : 0;
        res.json({ total_ganado: totalGanadoHoy });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener la ganancia total del día');
    }
});

// Ruta para obtener el total de ventas en el momento
app.get('/current-total-sales', async (req, res) => {
    try {
        const result = await pool.query('SELECT SUM(total) AS total_ventas FROM productos_vendidos');
        const totalVentas = result.rows[0].total_ventas || 0;
        res.json({ total_ventas: totalVentas });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el total de ventas en el momento');
    }
});

// Ruta para obtener las ganancias diarias
app.get('/ganancias-diarias', (req, res) => {
    pool.query('SELECT SUM(total_ganado) AS gananciasDiarias FROM ganancias_diarias WHERE DATE(fecha) = CURRENT_DATE', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result.rows[0].gananciasdiarias);
    });
});

// Ruta para obtener las ganancias del momento
app.get('/ganancias-momento', (req, res) => {
    pool.query('SELECT SUM(total_ganado) AS gananciasMomento FROM ganancias_diarias WHERE fecha >= NOW() - INTERVAL \'1 HOUR\'', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result.rows[0].gananciasmomento);
    });
});

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
