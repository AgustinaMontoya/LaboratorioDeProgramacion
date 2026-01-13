const navBar = document.getElementById("barraNav");

const contenedor = document.createElement("div");

contenedor.className = "header-container";

const logo = document.createElement("div");


logo.className = "logo";

const link = document.createElement("a");
link.href = "principal.html";

const imagen = document.createElement("img");

imagen.src = "../assets/images/logos/logo.png";
imagen.alt = "Logo Huellitas";
imagen.className = "logo-img";

link.appendChild(imagen);

logo.appendChild(link);


const lista = document.createElement("ul");
lista.className = "nav-menu";

const navItems = [
{class: "item", href: "principal.html",text: "Adopciones"},
{class:"item", href: "principal.html",text: "Refugios"},
{class: "item", href: "principal.html",text: "Tienda"},
{class:"item", href: "principal.html",text: "Donaciones"},
{class: "item", href: "principal.html",text: "Contacto"},
];


navItems.forEach(item =>{
const li = document.createElement("li");
li.className = item.class;

const a = document.createElement("a");
a.href = item.href; 
a.textContent = item.text;

li.appendChild(a);

lista.appendChild(li);

});

const menu = document.createElement("div");
menu.className = "user-menu";

const botonU = document.createElement("a");
botonU.className = "user-btn";
botonU.textContent = "Iniciar Sesión";

menu.appendChild(botonU);

contenedor.appendChild(logo);
contenedor.appendChild(lista);
contenedor.appendChild(menu);


navBar.appendChild(contenedor)























