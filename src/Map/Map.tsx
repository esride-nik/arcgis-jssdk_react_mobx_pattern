import React from "react";
import "./Map.css";

import EsriMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

function Map() {
  const esriMap = new EsriMap({
    basemap: "streets-vector",
  });
  new MapView({
    container: "map",
    map: esriMap,
  });

  return <div className="Map" id="map" />;
}

export default Map;
