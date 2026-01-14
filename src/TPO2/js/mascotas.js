// =======================
// Configuración básica
// =======================
const ITEMS_PER_PAGE = 8; // 2 x 4

// Datos (podés agregar más)
/*const mascotas = [
  { nombre: "Luna",   img: "../assets/images/pets/C1.jpeg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Max",    img: "../assets/images/pets/D1.jpeg", edad: "2 años", sexo: "Macho" },
  { nombre: "Mia",    img: "../assets/images/pets/C2.jpeg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Rocky",  img: "../assets/images/pets/D2.jpeg", edad: "2 años", sexo: "Macho" },
  { nombre: "Juan",   img: "../assets/images/pets/C3.jpeg", edad: "1 año",  sexo: "Macho" },
  { nombre: "Bella",  img: "../assets/images/pets/D3.jpeg", edad: "3 años", sexo: "Hembra" },
  { nombre: "Oliver", img: "../assets/images/pets/C4.jpeg", edad: "4 años", sexo: "Macho" },
  { nombre: "Lucy",   img: "../assets/images/pets/D4.jpeg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Toby",   img: "../assets/images/pets/D5.jpeg", edad: "5 años", sexo: "Macho" },
  { nombre: "Andre",   img: "../assets/images/pets/andre.jpeg", edad: " 27", sexo: "Hembra" },
  { nombre: "Simba",  img: "../assets/images/pets/D6.jpeg", edad: "1 año",  sexo: "Macho" },
  { nombre: "Cleo",   img: "../assets/images/pets/C6.jpeg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Bruno",  img: "../assets/images/pets/D7.jpeg", edad: "6 años", sexo: "Macho" },
  { nombre: "Luna",   img: "../assets/images/pets/C1.jpeg", edad: "2 años", sexo: "Hembra" }
];*/

// Función de arranque de la aplicación.
// - Carga los datos (await cargarDatos())
// - Luego dibuja la primera página según el hash (#p=...)
// - Maneja cualquier error que ocurra en el proceso.
async function init() {
    try {
        await cargarDatos();                 // Espera a que se cargue el JSON y se llene 'mascotas'
        renderPagina(getHashPage());         // Primera pintura del grid con la página actual del hash
    } catch (e) {
        console.error('No se pudieron cargar los datos:', e); // Log de error si algo falla
    }
}

// Cargar datos desde JSON

// Arreglo global donde quedarán los datos de las mascotas.
let mascotas = [];

// Carga el JSON con fetch y llena 'mascotas'.
async function cargarDatos() {
    // Hacemos la petición al archivo JSON.
    const masc = await fetch('../js/informacionMascotas.json');

    // Si la respuesta es satisfactoria (HTTP 200–299)...
    if (masc.ok) {
        const data = await masc.json();  // Parseamos el cuerpo como JSON
        // en este caso asignamos directo porque el Json ya es un arreglo del formato esperado.
        mascotas = data;

    } else {
        // Si el servidor respondió con error (404, 500, etc.), lo registramos.
        console.error("Error al cargar el archivo JSON:", masc.statusText);
    }
}

// Referencias a “nodos” (como tener campos a paneles en JavaFX)
const grid = document.getElementById("catalogo");
const pag = document.getElementById("paginacion");

// Cálculo de páginas

// =======================
// “Métodos”
// =======================

// Crea una tarjeta 
function crearTarjeta(item) {
    const wrapper = document.createElement("div");//crea un div dinamicamente
    wrapper.className = "polaroid"; //Le asigna el estilo css

    const label = document.createElement("label");//creal un label de manera dinamica
    label.className = "flip-card";//le asigna el estilo css

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "flip-toggle";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-front";

    const img = document.createElement("img");
    img.alt = item.nombre;
    img.src = item.img;
    // Fallback si la ruta de imagen falla
    img.onerror = () => {
        img.onerror = null;
        img.src = "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
        <rect width='100%' height='100%' fill='#eee'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
              font-family='system-ui' font-size='28' fill='#555'>${item.nombre}</text>
      </svg>`);
    };

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = item.nombre;

    const back = document.createElement("div");
    back.className = "card-back";

    const h3 = document.createElement("h3");
    h3.textContent = "Información";

    const pEdad = document.createElement("p");
    pEdad.className = "edad";
    pEdad.textContent = "Edad: " + (edad(item.edad) || "—");

    const pSexo = document.createElement("p");
    pSexo.className = "sexo";
    pSexo.textContent = "Sexo: " + (item.sexo || "—");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "buttonOpcion btn-adoptar";
    btn.textContent = "Adoptar";
    btn.addEventListener("click", function () {
        alert("¡Gracias! Iniciaremos el proceso para adoptar a " + item.nombre + ".");
    });

    // Armar árbol
    front.appendChild(img);
    front.appendChild(title);
    back.appendChild(h3);
    back.appendChild(pEdad);
    back.appendChild(pSexo);
    back.appendChild(btn);

    inner.appendChild(front);
    inner.appendChild(back);

    label.appendChild(input);
    label.appendChild(inner);

    wrapper.appendChild(label);
    return wrapper;
}
function edad(fNacimiento) {
    const hoy = new Date();//fecha actual
    const nacimiento = new Date(fNacimiento);//convierte el string a fecha
    let respuesta;

    if (isNaN(nacimiento.getTime())) respuesta = "fecha invalida"; // fecha inválida
    let años = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();
    
    if (hoy.getDate() < nacimiento.getDate()) meses--;

    if (meses < 0) {
        años--;
        meses += 12;
    }

    if (años > 0){ respuesta = `${años} año${años !== 1 ? "s" : ""}`;}else{respuesta =`${meses} mes${meses !== 1 ? "es" : ""}`;}

    return respuesta
}
// Dibuja una página (corta el arreglo y lo pinta)
function renderPagina(p) {
    let totalPages = Math.max(1, Math.ceil(mascotas.length / ITEMS_PER_PAGE));
    // Clamp
    var actual = p;
    if (actual < 1) actual = 1;
    if (actual > totalPages) actual = totalPages;

    var start = (actual - 1) * ITEMS_PER_PAGE;
    var end = start + ITEMS_PER_PAGE;
    var subset = mascotas.slice(start, end); // sublista

    // Limpiar contenedor
    grid.innerHTML = "";

    // Pintar tarjetas
    var frag = document.createDocumentFragment();
    for (var i = 0; i < subset.length; i++) {
        var tarjeta = crearTarjeta(subset[i]);
        frag.appendChild(tarjeta); // crea el nodo hijo
    }
    grid.appendChild(frag);//agrega el nodo al padre / lo enlaza

    // Actualizar paginación
    renderPaginacion(actual, totalPages);
}

// Dibuja los botones de paginación y les pone handler
function renderPaginacion(actual, totalPages) {

    pag.innerHTML = "";
    if (totalPages <= 1) {
        pag.hidden = true;
        return;
    }
    pag.hidden = false;

    function mkBtn(label, page, disabled, active) {
        var b = document.createElement("button");
        b.className = "buttonOpcion btn-paginacion";
        b.textContent = label;
        if (disabled) b.disabled = true;
        if (active) b.classList.add("active");
        b.addEventListener("click", function () {
            location.hash = "#p=" + page; // navega por hash (no recarga)
        });
        return b;
    }

    // ← ‹ 1 2 3 … › →
    pag.appendChild(mkBtn("←", 1, actual === 1, false));
    pag.appendChild(mkBtn("‹", actual - 1, actual === 1, false));

    for (var i = 1; i <= totalPages; i++) {
        pag.appendChild(mkBtn(String(i), i, false, i === actual));
    }

    pag.appendChild(mkBtn("›", actual + 1, actual === totalPages, false));
    pag.appendChild(mkBtn("→", totalPages, actual === totalPages, false));
}

// Lee la página desde el hash del URL (#p=3)
function getHashPage() {
    var m = location.hash.match(/p=(\d+)/); // ¡una sola barra invertida en \d!
    return m ? parseInt(m[1], 10) : 1;
}

// Eventos “de ciclo de vida” (equivalente a start/ready)
/*window.addEventListener("hashchange", function () {
  renderPagina(getHashPage());
});

document.addEventListener("DOMContentLoaded", function () {
  renderPagina(getHashPage()); // primera render
});*/

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("hashchange", () => renderPagina(getHashPage()));
