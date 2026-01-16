const express = require("express");
const path = require("path");
const fs = require("fs").promises; // Usamos promesas para lectura asíncrona
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de rutas estáticas
app.use(express.static(path.join(__dirname, "../TPO2")));
app.use(express.static(path.join(__dirname, "../TPO2/website")));

// Rutas de Vistas (HTML)
const vistas = ["/", "/adopciones", "/refugios", "/tienda", "/donaciones", "/contacto"];
vistas.forEach(ruta => {
    app.get(ruta, (req, res) => {
        const archivo = ruta === "/" ? "principal.html" : `${ruta.replace("/", "")}.html`;// Mapeo de ruta a archivo
        res.sendFile(path.join(__dirname, "..", "TPO2", "website", archivo));
    });
});

// --- API: LÓGICA DE PAGINACIÓN ---
app.get("/mascotas", async (req, res) => {
    try {
        // 1. Leemos el archivo JSON
        const rutaJSON = path.join(__dirname, "..", "TPO2", "js", "informacionMascotas.json");// Ruta al archivo    
        const data = await fs.readFile(rutaJSON, "utf-8"); // Leemos como texto
        const todasLasMascotas = JSON.parse(data); // Array completo de mascotas

        // 2. Configuramos la paginación
        const page = parseInt(req.query.page) || 1; // Si no envían página, es la 1
        const limit = 8; // Mascotas por página

        // 3. Calculamos índices (Matemática del servidor)
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        // 4. Cortamos el array
        const resultados = todasLasMascotas.slice(startIndex, endIndex);
        const totalPaginas = Math.ceil(todasLasMascotas.length / limit);

        // 5. Enviamos la respuesta limpia al front
        res.json({
            mascotas: resultados,
            paginaActual: page,
            totalPaginas: totalPaginas
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});