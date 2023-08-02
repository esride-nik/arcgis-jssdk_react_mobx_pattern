import * as React from "react";
import { useEffect } from "react";
import { useMapContext } from "./useMapContext";
import "./Map.css";
import { useStores } from "Stores/useStores";
import { observer } from "mobx-react";

interface MapCmpProps {}

const MapCmp: React.FC<MapCmpProps> = observer((props: MapCmpProps) => {
  const mapContext = useMapContext();
  const { sceneStore } = useStores();

  // map must be initialized after first render, because we need the DOM node ref
  useEffect(mapContext.initMap, []);

  useEffect(() => {
    if (sceneStore.extent.width > 0) {
      mapContext.mapView.extent = sceneStore.extent;
    }
  }, [mapContext.mapView, sceneStore.extent])

  useEffect(() => {
    mapContext.mapView.rotation = -sceneStore.camera.heading;
  }, [mapContext.mapView, sceneStore.camera.heading])

  return <>
    <div ref={mapContext.mapNode} id="map" />
  </>;
});

export default MapCmp;
