import * as React from 'react';
import MapController from './MapController';
import { MapContext } from './MapProvider';

export const useMapContext = (): MapController => React.useContext(MapContext);
