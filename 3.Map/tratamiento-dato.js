const alquileres = require('./data/alquiler-distrito-retiro-pacifico.json');
const coordinates = require('./data/coordenadas-distrito-retiro-pacifico.json');
const fs = require('fs');

//Relacionar dos arrays en función de una propiedad de cada uno de los objetos que tiene en común:

//Asignarle a cada objeto de array un id
const COORDS_BY_ID = coordinates.reduce((old, cur, i, arr) => {
    old[cur.id] = cur;
    return old;
}, {});
console.log(COORDS_BY_ID);

//Si existe al inmueble que no tenga coordenadas le introducimos la (0,0)
const getCoords = (id) => {
    return COORDS_BY_ID.hasOwnProperty(id) ?
        COORDS_BY_ID[id] : { latitude: 0, longitude: 0 }
}

//Construimos nuestro array de objetos con la información de los dos archivos .json
let data = alquileres
    .map(a => {
        let { latitude, longitude } = getCoords(a.id);
        let coords = [longitude, latitude];
        return {...a, coords }
    })


// Construcción del archivo .geoJson para poder servirlo desde nuestro ordenador
const fromArrayToGeoJSON = (arr) => {
    const geoJSON = {
        "type": "FeatureCollection",
        "features": []
    };
    const geoJsonFeatures = geoJSON.features;
    arr.map((el) => {
        geoJsonFeatures.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": el.coords
            },
            "properties": el
        })
    });
    return geoJSON;
}

//console.log(JSON.stringify(fromArrayToGeoJSON(data)));
fs.writeFile('./data/housting-distrito-retiro-pacifico.geojson', JSON.stringify(fromArrayToGeoJSON(data)), (err) => {
    if (err) console.log(err);
    console.log("Housting: Successfully Written to File.");
});