import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mascotasRoutes } from "./routes/mascotas_rutas.js";
import { vistasRoutes } from "./routes/vistas_rutas.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración necesaria para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de rutas estáticas
app.use(express.static(path.join(__dirname, "../TPO2")));
app.use(express.static(path.join(__dirname, "../TPO2/website")));

// --- API ---
app.use("/api/mascotas", mascotasRoutes); 

// --- VISTAS HTML ---
app.use("/", vistasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor MVC corriendo en http://localhost:${PORT}`);
});