fetch("../modulos/menu.html")
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar el menú");
    return res.text();
  })
  .then(html => {
    document.getElementById("menu-container").innerHTML = html;
  })
  .catch(err => console.error(err));
