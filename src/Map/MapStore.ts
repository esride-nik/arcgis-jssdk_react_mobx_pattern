// ===================================================================
// For the purpose of the exercise, don't change anything in this file
// ===================================================================

import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import { action, makeObservable, observable } from "mobx";
class MapStore {
  public mapView?: MapView = undefined;
  public center = new Point();

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor() {
    makeObservable(this, {
      mapView: observable,
      center: observable,
      layerVisibility: observable,
      setMapView: action,
      setCenter: action,
    });
  }

  setMapView = (mapView: MapView): void => {
    this.mapView = mapView;
  };
  setCenter = (center: Point): void => {
    this.center = center;
  };
}

export default MapStore;
