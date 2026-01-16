import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mascotasRoutes } from "./routes/mascotas_rutas.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración necesaria para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de rutas estáticas
app.use(express.static(path.join(__dirname, "../TPO2")));
app.use(express.static(path.join(__dirname, "../TPO2/website")));

// --- API ---
app.use("/mascotas", mascotasRoutes); 
// --- VISTAS HTML ---
const vistas = ["/", "/adopciones", "/refugios", "/tienda", "/donaciones", "/contacto"];
vistas.forEach(ruta => {
    app.get(ruta, (req, res) => {
        const archivo = ruta === "/" ? "principal.html" : `${ruta.replace("/", "")}.html`;
        res.sendFile(path.join(__dirname, "..", "TPO2", "website", archivo));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor MVC corriendo en http://localhost:${PORT}`);
});