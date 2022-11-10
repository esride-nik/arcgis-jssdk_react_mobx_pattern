import * as React from "react";
import { useStores } from "../Stores/useStores";
import MapController from "./MapController";

interface MapProviderProps {
  children: React.ReactNode;
}

const mapController = new MapController();

export const MapContext = React.createContext<MapController>(mapController);

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const stores = useStores();
  mapController.setStores(stores);
  return (
    <MapContext.Provider value={mapController}>{children}</MapContext.Provider>
  );
};
