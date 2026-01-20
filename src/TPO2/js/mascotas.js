const API_URL = '/api/mascotas';
const contenedor = document.getElementById("catalogo");
const paginacion = document.getElementById("paginacion");

// Función principal que se ejecuta al cargar
document.addEventListener("DOMContentLoaded", () => {
    cargarPagina(1); // Carga la página 1 por defecto
});

async function cargarPagina(numeroPagina) {
    try {
        // 1. Pedimos los datos al servidor
        const res = await fetch(`${API_URL}?page=${numeroPagina}`);
        if (!res.ok) throw new Error("Error de conexión");
        
        const data = await res.json();

        // 2. Renderizamos (pintamos)
        renderizarTarjetas(data.mascotas);
        renderizarBotones(data.paginaActual, data.totalPaginas);

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<h3 style="text-align:center">Error cargando mascotas.</h3>`;
    }
}

function renderizarTarjetas(listaMascotas) {
    const html = listaMascotas.map(mascota => {
        // Calculamos edad simple (si es fecha o texto)
        let edadDisplay = calcularEdadExacta(mascota.edad);
        

        return `
        <div class="polaroid">
            <label class="flip-card">
                <input type="checkbox" class="flip-toggle">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${mascota.img}" 
                             alt="${mascota.nombre}" 
                             onerror="this.src='../assets/images/placeholder.jpg'">
                        <div class="title">${mascota.nombre}</div>
                    </div>
                    <div class="card-back">
                        <h3>Información</h3>
                        <p>Edad: ${edadDisplay}</p>
                        <p>Sexo: ${mascota.sexo}</p>
                        <button class="buttonOpcion" onclick="adoptar('${mascota.nombre}')">
                            Adoptar
                        </button>
                    </div>
                </div>
            </label>
        </div>
        `;
    }).join(''); // Unimos todo el array en un solo string de HTML

    contenedor.innerHTML = html;
}

function renderizarBotones(actual, total) {
    let botonesHTML = '';

    // Botón Anterior
    if (actual > 1) {
        botonesHTML += `<button class="buttonOpcion btn-paginacion" onclick="cargarPagina(${actual - 1})"> < </button>`;
    }else {
        botonesHTML += `<button class="buttonOpcion btn-paginacion" disabled> < </button>`;
    }

    // Botones Números
    for (let i = 1; i <= total; i++) {
        const activo = i === actual ? 'style="background-color:#ccc;"' : ''; // Estilo simple inline para resaltar
        botonesHTML += `<button class="buttonOpcion btn-paginacion" ${activo} onclick="cargarPagina(${i})">${i}</button>`;
    }

    // Botón Siguiente
    if (actual < total) {
        botonesHTML += `<button class="buttonOpcion btn-paginacion" onclick="cargarPagina(${actual + 1})"> > </button>`;
    }else {
        botonesHTML += `<button class="buttonOpcion btn-paginacion" disabled> > </button>`;
    }

    paginacion.innerHTML = botonesHTML;
    paginacion.hidden = false;
}

// Función auxiliar para el botón del click
function adoptar(nombre) {
    alert(`¡Gracias por tu interés en ${nombre}!`);

}


function calcularEdadExacta(fechaString) {
    const nacimiento = new Date(fechaString);
    
    // Si no es una fecha válida (ej: "2 años"), devolvemos el texto original
    if (isNaN(nacimiento.getTime())) return fechaString;

    const hoy = new Date();
    
    let anios = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();

    // Ajuste: Si el mes actual es menor al mes de nacimiento, 
    // o es el mismo mes pero no ha llegado el día, restamos un año.
    if (meses < 0 || (meses === 0 && hoy.getDate() < nacimiento.getDate())) {
        anios--;
        meses += 12; // Sumamos 12 para obtener los meses restantes del año anterior
    }

    // Lógica de visualización
    if (anios > 1) return `${anios} años`;
    if (anios === 1) return `${anios} año`;
    if (anios === 0 && meses > 0) return `${meses} meses`;
    
    return "Recién nacido"; // Si tiene 0 años y 0 meses
}