require([
    "esri/Map",
    "esri/layers/GeoJSONLayer",
    "esri/views/MapView",
    "esri/renderers/HeatmapRenderer",
    "esri/widgets/Legend",
    "esri/widgets/Search"
], function(Map, GeoJSONLayer, MapView, HeatmapRenderer, Legend, Search) {
    // Datos de los pisos
    const url =
        "http://localhost:3000//";

    // Ventana de información que se activará al seleccionar cada piso
    const template = {
        title: "Pisos en Madrid",
        content: "{descripcion} </br> {precio} € / {habitaciones} habitaciones"
    };

    const renderer = {
        type: "heatmap",
        field: "precio",
        colorStops: [{
                ratio: 0,
                color: "rgba(255, 255, 255, 0)"
            },
            {
                ratio: 0.2,
                color: "rgba(255, 255, 255, 1)"
            },
            {
                ratio: 0.5,
                color: "rgba(255, 140, 0, 1)"
            },
            {
                ratio: 0.8,
                color: "rgba(255, 140, 0, 1)"
            },
            {
                ratio: 1,
                color: "rgba(255, 0, 0, 1)"
            }
        ],
        minPixelIntensity: 0,
        maxPixelIntensity: 5000
    };

    // Capa del mapa que va a contener los pisos a visualizar
    const geojsonLayer = new GeoJSONLayer({
        url: url,
        title: "Precio pisos en Madrid",
        copyright: "Loretus S.A",
        popupTemplate: template,
        renderer: renderer
    });

    // Mapa
    const map = new Map({
        basemap: "gray",
        layers: [geojsonLayer]
    });

    // Vista del mapa
    const view = new MapView({
        container: "viewDiv",
        center: [-3.675376, 40.405236],
        zoom: 15,
        map: map
    });

    view.ui.add(
        new Legend({
            view: view
        }),
        "bottom-left"
    );

    var searchWidget = new Search({
        view: view
    });

    view.ui.add(searchWidget, {
        position: "top-right"
    });
}); 