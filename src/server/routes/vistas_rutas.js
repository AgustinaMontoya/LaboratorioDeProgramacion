import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vistasRoutes = Router();

// Helper para buscar los HTML en la carpeta correcta
// Subimos 2 niveles desde /src/routes/ hasta la raiz y entramos a TPO2/website
const htmlPath = (archivo) => path.join(__dirname, "../../TPO2/website", archivo);

// --- TUS RUTAS DE PÁGINAS ---
vistasRoutes.get("/", (req, res) => res.sendFile(htmlPath("principal.html")));
vistasRoutes.get("/adopciones", (req, res) => res.sendFile(htmlPath("adopciones.html")));
vistasRoutes.get("/refugios", (req, res) => res.sendFile(htmlPath("refugios.html")));
vistasRoutes.get("/tienda", (req, res) => res.sendFile(htmlPath("tienda.html")));
vistasRoutes.get("/donaciones", (req, res) => res.sendFile(htmlPath("donaciones.html")));
vistasRoutes.get("/contacto", (req, res) => res.sendFile(htmlPath("contacto.html")));

export { vistasRoutes };