import { Router } from "express";   
import { MascotasController } from "../controllers/mascotas_controllers.js"; // Faltaba .js

const mascotasRoutes = Router();


mascotasRoutes.get("/", MascotasController.getAll);


export { mascotasRoutes };