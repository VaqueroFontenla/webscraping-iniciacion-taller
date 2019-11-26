require([
    "esri/Map",
    "esri/layers/GeoJSONLayer",
    "esri/views/MapView"
], function(Map, GeoJSONLayer, MapView) {
    // If GeoJSON files are not on the same domain as your website, a CORS enabled server
    // or a proxy is required.
    const url =
        "http://localhost:3000//";

    // Paste the url into a browser's address bar to download and view the attributes
    // in the GeoJSON file. These attributes include:
    // * mag - magnitude
    // * type - earthquake or other event such as nuclear test
    // * place - location of the event
    // * time - the time of the event
    // Use out of box popupTemplate function DateString to format time field into a human-readable format

    const template = {
        title: "Pisos en Madrid",
        content: "{descripcion} </br> {precio} / {habitaciones}"
    };

    const renderer = {
        type: "simple",
        field: "precio",
        symbol: {
            type: "simple-marker",
            color: "orange",
            outline: {
                color: "white"
            }
        },
        visualVariables: [{
            type: "size",
            field: "precio",
            stops: [{
                value: 700,
                size: "4px"
            }, {
                value: 1300,
                size: "40px"
            }]
        }]
    };

    const geojsonLayer = new GeoJSONLayer({
        url: url,
        copyright: "Loretus S.A",
        popupTemplate: template,
        renderer: renderer //optional
    });

    const map = new Map({
        basemap: "gray",
        layers: [geojsonLayer]
    });

    const view = new MapView({
        container: "viewDiv",
        center: [-3.688168, 40.4034295],
        zoom: 15,
        map: map
    });
});