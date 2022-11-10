import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import { action, makeObservable, observable } from "mobx";
import AppStore from "../Stores/AppStore";

class MapStore {
  private readonly appStore: AppStore;
  public mapView?: MapView = undefined;
  public center: Point;

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor(appStore: AppStore) {
    this.appStore = appStore;
    this.center = new Point({
      x: this.appStore.config.initialMapCenter[0],
      y: this.appStore.config.initialMapCenter[1],
      spatialReference: {
        wkid: this.appStore.config.wkid,
      },
    });

    makeObservable(this, {
      center: observable,
      mapView: observable,
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
