//server.js

// Llamamos al módulo Express y lo asignamos a app
const express = require("express");
const app = express();
//Método de File-System que accede a un fichero para su lectura y nos entrega el contenido en forma de buffer o en forma de cadena.
const fs = require('fs');

// Parsearmos nuestros datos 
const url = './data/housting-distrito-retiro-pacifico.geojson';
const data = fs.readFileSync(url, 'utf-8');
let geoData = JSON.parse(data);


// Añadimos una respuesta para la peticición HTTP de tipo GET a la url raiz (/).
app.get('/', (req, res) => {
    res.send( geoData);
  });

// Se inicia la aplicación en el puerto 3000. 
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});