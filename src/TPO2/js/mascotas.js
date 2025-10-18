// =======================
// Configuración básica
// =======================
const ITEMS_PER_PAGE = 8; // 2 x 4

// Datos (podés agregar más)

const mascotas = [
  { nombre: "Luna",   img: "../assets/images/pets/C1.jpeg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Max",    img: "../assets/images/pets/D1.jpeg", edad: "2 años", sexo: "Macho" },
  { nombre: "Mia",    img: "../assets/images/pets/C2.jpeg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Rocky",  img: "../assets/images/pets/D2.jpeg", edad: "2 años", sexo: "Macho" },
  { nombre: "Juan",   img: "../assets/images/pets/C3.jpeg", edad: "1 año",  sexo: "Macho" },
  { nombre: "Bella",  img: "../assets/images/pets/D3.jpeg", edad: "3 años", sexo: "Hembra" },
  { nombre: "Oliver", img: "../assets/images/pets/C4.jpeg", edad: "4 años", sexo: "Macho" },
  { nombre: "Lucy",   img: "../assets/images/pets/D4.jpeg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Toby",   img: "../assets/images/pets/D5.jpeg", edad: "5 años", sexo: "Macho" },
  { nombre: "Andre",  img: "../assets/images/pets/andre.jpg", edad: " 27", sexo: "Hembra" },
  { nombre: "Simba",  img: "../assets/images/pets/D6.jpg", edad: "1 año",  sexo: "Macho" },
  { nombre: "Cleo",   img: "../assets/images/pets/C5.jpg", edad: "2 años", sexo: "Hembra" },
  { nombre: "Bruno",  img: "../assets/images/pets/D7.jpeg", edad: "6 años", sexo: "Macho" }
];

// Referencias a “nodos” (como tener campos a paneles en JavaFX)
const grid = document.getElementById("catalogo");
const pag  = document.getElementById("paginacion");

// Cálculo de páginas
const totalPages = Math.max(1, Math.ceil(mascotas.length / ITEMS_PER_PAGE));

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
  pEdad.textContent = "Edad: " + (item.edad || "—");

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

// Dibuja una página (corta el arreglo y lo pinta)
function renderPagina(p) {
  // Clamp
  var actual = p;
  if (actual < 1) actual = 1;
  if (actual > totalPages) actual = totalPages;

  var start = (actual - 1) * ITEMS_PER_PAGE;
  var end   = start + ITEMS_PER_PAGE;
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
  renderPaginacion(actual);
}

// Dibuja los botones de paginación y les pone handler
function renderPaginacion(actual) {
  pag.innerHTML = "";
  if (totalPages <= 1) { pag.hidden = true; return; }
  pag.hidden = false;

  function mkBtn(label, page, disabled, active) {
    var b = document.createElement("button");
    b.className = "buttonOpcion btn-paginacion";
    b.textContent = label;
    if (disabled) b.disabled = true;
    if (active)   b.classList.add("active");
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
window.addEventListener("hashchange", function () {
  renderPagina(getHashPage());
});

document.addEventListener("DOMContentLoaded", function () {
  renderPagina(getHashPage()); // primera render
});
