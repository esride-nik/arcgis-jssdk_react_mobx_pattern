import MapView from "@arcgis/core/views/MapView";
import { action, makeObservable, observable } from "mobx";
import AppStore from "../Stores/AppStore";

class MapStore {
  private readonly appStore: AppStore;
  public mapView?: MapView = undefined;

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor(appStore: AppStore) {
    this.appStore = appStore;

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
