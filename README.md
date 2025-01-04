# Lector-de-barras
¡Claro! Aquí tienes una estructura básica para tu archivo **README.md**, adaptada a tu proyecto de lector de códigos de barras con frontend y backend:

---

# LectorAR: Lector de Códigos de Barras

**LectorAR** es una aplicación web diseñada para ayudar en la gestión de productos de una tienda de abarrotes. Permite escanear códigos de barras, consultar información de productos, registrar ventas y calcular ganancias diarias. 

El proyecto está dividido en dos partes: el frontend, desplegado en **Netlify**, y el backend, desplegado en **Render**.

---

## 🛠️ Características principales

1. **Escaneo de códigos de barras**: Consulta información del producto basado en su código de barras.
2. **Gestión de inventario**: Muestra la cantidad, fecha de vencimiento y precio de los productos.
3. **Registro de ventas**: Calcula el cambio y actualiza la lista de productos vendidos.
4. **Cálculo de ganancias diarias**: Permite visualizar ganancias totales por día.

---

## 🚀 Despliegue

- **Frontend**: [Netlify](https://netlify.app)  
  URL: [https://tu-proyecto.netlify.app](https://tu-proyecto.netlify.app)

- **Backend**: [Render](https://render.com)  
  URL: [https://tu-backend.onrender.com](https://tu-backend.onrender.com)

---

## 📂 Estructura del proyecto

```plaintext
LectorAR/
├── public/               # Archivos estáticos (HTML, CSS, JS)
│   ├── index.html        # Página principal
│   ├── styles.css        # Estilos de la interfaz
│   ├── productos.html    # Página para ver productos
│   ├── ganancias.html    # Página para ver ganancias
│
├── server.js             # Backend en Node.js
├── .env                  # Variables de entorno
├── package.json          # Dependencias del proyecto
├── netlify.toml          # Configuración de Netlify
└── README.md             # Documentación del proyecto
```

---

## 🖥️ Configuración local

Sigue estos pasos para correr el proyecto en tu máquina local:

### 1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/LectorAR.git
cd LectorAR
```

### 2. Configura las dependencias
Instala las dependencias del backend:
```bash
npm install
```

### 3. Variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DB_USER=tu_usuario
DB_HOST=tu_host
DB_NAME=tu_base_de_datos
DB_PASSWORD=tu_contraseña
DB_PORT=5432
```

### 4. Inicia el backend
```bash
npm start
```

### 5. Abre el frontend
- Navega a `public/index.html` para abrir la interfaz de usuario.

---

## 🛠️ Tecnologías usadas

### Frontend:
- **HTML5** y **CSS3**: Para la interfaz de usuario.
- **Netlify**: Despliegue del sitio estático.

### Backend:
- **Node.js** con **Express**: Para manejar las solicitudes del frontend.
- **PostgreSQL**: Base de datos para almacenar los productos y ventas.
- **Render**: Despliegue del backend y base de datos.

---

## 🌐 APIs del Backend

### 1. **Obtener producto por código de barras**
```http
GET /product/:barcode
```
- **Descripción**: Devuelve información del producto según el código de barras.
- **Respuesta**:
```json
{
  "nombre": "Producto Ejemplo",
  "cantidad": 100,
  "fecha_vencimiento": "2024-12-31",
  "precio": 19.99,
  "productos_similares": ["perla", "arete"]
}
```

### 2. **Registrar una venta**
```http
POST /sell
```
- **Descripción**: Registra una venta y actualiza el inventario.
- **Cuerpo**:
```json
{
  "codigo_barras": "123",
  "cantidad": 1
}
```

### 3. **Ver ganancias diarias**
```http
GET /ganancias
```
- **Descripción**: Devuelve las ganancias acumuladas del día.

---

## 📸 Capturas de pantalla

### 1. Vista principal
![Vista principal](https://ruta-a-tu-imagen.jpg)

### 2. Detalle del producto
![Detalle del producto](https://ruta-a-tu-imagen2.jpg)

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:
1. Haz un fork del proyecto.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Haz un push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más información.

---

¡Espero que esta estructura te sea útil! 🚀 Si necesitas agregar o ajustar algo, no dudes en decírmelo. 😊


