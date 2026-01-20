import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MascotaModel {
    static async getAll(page, limit, filters) {
        
        try {
            const rutaJSON = path.join(__dirname, '../../TPO2/js/informacionMascotas.json');
            console.log("Leyendo JSON desde:", rutaJSON);
            
            const data = await fs.readFile(rutaJSON, 'utf-8');
            let todasLasMascotas = JSON.parse(data);

            if (!Array.isArray(todasLasMascotas)) {
                throw new Error("El formato del JSON es incorrecto");
            }else {
                if (filters.min) {
                    todasLasMascotas = todasLasMascotas.filter(mascota => mascota.edad >= parseInt(filters.min)); // Filtro por edad mínima
                }
                if (filters.max) {
                    todasLasMascotas = todasLasMascotas.filter(mascota => mascota.edad <= parseInt(filters.max)); // Filtro por edad máxima
                }
            }
            // Aquí podríamos aplicar filtros si los tuviéramos (min, max, etc.)
            // Paginación
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const resultados = todasLasMascotas.slice(startIndex, endIndex);
            const totalPaginas = Math.ceil(todasLasMascotas.length / limit);

            return {
                mascotas: resultados,
                paginaActual: page,
                totalPaginas: totalPaginas
            };

        } catch (error) {
            console.error("Error leyendo JSON:", error);
            // Si falla la ruta, devolvemos array vacío
            return { mascotas: [], paginaActual: 1, totalPaginas: 0 };
        }
    }
}