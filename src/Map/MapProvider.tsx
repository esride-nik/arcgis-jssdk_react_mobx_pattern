import * as React from 'react';
import MapController from './MapController';

interface MapProviderProps {
  children: React.ReactNode;
}

const mapController = new MapController();

export const MapContext = React.createContext<MapController>(mapController);

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
    return <MapContext.Provider value={mapController}>{children}</MapContext.Provider>;
};
