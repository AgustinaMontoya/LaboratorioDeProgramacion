import { MascotaModel } from "../models/mascota_model.js"; 

export class MascotasController {
    static async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 8;
            
            // Pasamos también los filtros del query si existen
            const filters = {
                min: req.query.min,
                max: req.query.max
            };

            const datos = await MascotaModel.getAll(page, limit, filters);
            res.json(datos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }   
}