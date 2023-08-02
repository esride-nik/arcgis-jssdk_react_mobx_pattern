import * as React from "react";
import { useEffect } from "react";
import { useMapContext } from "./useMapContext";
import "./Map.css";
import { useStores } from "Stores/useStores";
import { observer } from "mobx-react";

interface MapCmpProps {}

const MapCmp: React.FC<MapCmpProps> = observer((props: MapCmpProps) => {
  const mapContext = useMapContext();
  const { mapStore, sceneStore } = useStores();

  // map must be initialized after first render, because we need the DOM node ref
  useEffect(mapContext.initMap, []);

  useEffect(() => {
    mapContext.mapView.center = sceneStore.center;
  }, [sceneStore.center])
  
  useEffect(() => {
    console.log("map center", mapStore.center);
  }, [mapStore.center]);

  return <>
    <div ref={mapContext.mapNode} id="map" />
  </>;
});

export default MapCmp;
