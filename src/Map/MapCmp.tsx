import * as React from "react";
// import { observer } from 'mobx-react';
import { useEffect } from "react";
import { useMapContext } from "./useMapContext";
import { useStores } from "../Stores/useStores";
import "./Map.css";

interface MapCmpProps {}

// const MapCmp: React.FC<MapCmpProps> = observer((props: MapCmpProps) => {
const MapCmp: React.FC<MapCmpProps> = (props: MapCmpProps) => {
  const mapContext = useMapContext();
  const { mapStore } = useStores();

  // map must be initialized after first render, because we need the DOM node ref
  useEffect(mapContext.initMap, []);

  console.log(mapStore.center);

  return <div ref={mapContext.mapNode} id="map" />;
};

export default MapCmp;
