// footer
const footer = document.getElementById("footer");
footer.className = "footer";

// container
const container = document.createElement("div");
container.className = "footer-container";

// row
const row = document.createElement("div");
row.className = "footer-row";

// footer-links
const linksA = document.createElement("div");
linksA.className = "footer-links";

// h4
const titleA = document.createElement("h4");
titleA.textContent = 'Compañía y Organización';

// ul
const ul = document.createElement("ul");

const itemsA = [
    {class: "item", href: "principal.html", text: "Sobre nosotros"},
    {class: "item", href: "principal.html", text: "Únete al equipo"},
    {class: "item", href: "principal.html", text: "Políticas de privacidad"},
    {class: "item", href: "principal.html", text: "Preguntas"}
];

itemsA.forEach(item => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;

    li.appendChild(a);
    ul.appendChild(li);
});

linksA.appendChild(titleA);
linksA.appendChild(ul);

// footer-links
const linksB = document.createElement("div");
linksB.className = "footer-links";

// h4
const titleB = document.createElement("h4");
titleB.textContent = 'Redes Sociales';

const social = document.createElement("div");
social.className = "social-links";

const itemsB = [
    {href: "principal.html", class: "fab fa-facebook-f"},
    {href: "principal.html", class: "fab fa-instagram"},
    {href: "principal.html", class: "fab fa-x-twitter"},
    {href: "principal.html", class: "fab fa-linkedin"}
];

itemsB.forEach(item => {
    const a = document.createElement("a");
    a.href = item.href;

    const i = document.createElement("i");
    i.className = item.class;
    
    a.appendChild(i);
    social.appendChild(a);
});

linksB.appendChild(titleB);
linksB.appendChild(social);

row.appendChild(linksA);
row.appendChild(linksB);

container.appendChild(row);

const brand = document.createElement("div");
brand.className = "footer-brand";

const paragraph = document.createElement("p");

const strong = document.createElement("strong");
strong.textContent = 'Adopciones Huellitas';

const text = document.createTextNode('© 2025 | Diseño y Desarrollo en GitHub: ');

const link = document.createElement('a');
link.href = '';
link.target = '_blank';
link.rel = 'noopener';
link.textContent = 'LaboratorioDeProgramación';

paragraph.appendChild(strong);
paragraph.appendChild(text);
paragraph.appendChild(link);

brand.appendChild(paragraph);

footer.appendChild(container);
footer.appendChild(brand);



