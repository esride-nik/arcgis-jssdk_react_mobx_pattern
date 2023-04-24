import MapView from "@arcgis/core/views/MapView";
import { action, makeObservable, observable } from "mobx";
class MapStore {
  public mapView?: MapView = undefined;

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor() {
    makeObservable(this, {
      mapView: observable,
      layerVisibility: observable,
      setMapView: action,
    });
  }

  setMapView = (mapView: MapView): void => {
    this.mapView = mapView;
  };
}

export default MapStore;
