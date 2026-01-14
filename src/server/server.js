const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../TPO2")));
app.use(express.static(path.join(__dirname, "../TPO2/website")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"..","TPO2", "website", "principal.html"));
})
app.get("/adopciones", (req, res) => {
  res.sendFile(path.join(__dirname,"..","TPO2", "website", "adopciones.html"));
})
app.get("/refugios", (req, res) => {
  res.sendFile(path.join(__dirname,"..","TPO2", "website", "refugios.html"));
})
app.get("/tienda", (req, res) => {
  res.sendFile(path.join(__dirname,"..","TPO2", "website", "tienda.html"));
})
app.get("/donaciones", (req, res) => {
  res.sendFile(path.join(__dirname,"..","TPO2", "website", "donaciones.html"));
})
app.get("/contacto", (req, res) => {
  res.sendFile(path.join(__dirname,"..","TPO2", "website", "contacto.html"));
})
/*const fs = require("fs");//modulo para manejar archivos
app.get("/mascota", (req, res) => {//ruta para obtener el archivo JSON
  const ruta = path.join(__dirname, "..","TPO2","js", "informacionMascotas.json");//ruta del archivo JSON
  const mascotas = JSON.parse(fs.readFileSync(ruta, "utf-8")); //lee el archivo JSON
  const { min,max } = req.query; //datos enviados por el usuario
  
  let resultado = mascotas;

  if (min && max) { resultado = mascotas.filter(m => m.edad >= Number(min) && m.edad < Number(max));}//filtra por edad
  res.json(resultado);//envia el resultado al cliente
});*/


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
