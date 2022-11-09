import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import { action, makeObservable, observable } from "mobx";
import Layer from "@arcgis/core/layers/Layer";
import AppStore from "../Stores/AppStore";

class MapStore {
  private readonly appStore: AppStore;
  public mapView?: MapView = undefined;
  public center: Point;
  public scale: number;
  public rotation: number;
  public basemap: string;
  public layers: Layer[] = [];

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor(appStore: AppStore) {
    this.appStore = appStore;
    // this.center = new Point(this.appStore.config.map.init.center);
    // this.scale = this.appStore.config.map.init.scale;
    // this.rotation = this.appStore.config.map.init.rotation;
    // this.basemap = this.appStore.config.map.basemap;
    this.center = new Point();
    this.scale = 0;
    this.rotation = 0;
    this.basemap = "streets-vector";

    makeObservable(this, {
      center: observable,
      mapView: observable,
      layers: observable,
      layerVisibility: observable,
      setMapView: action,
      setCenter: action,
      setLayers: action,
    });
  }

  setMapView = (mapView: MapView): void => {
    this.mapView = mapView;
  };
  setCenter = (center: Point): void => {
    this.center = center;
  };
  setLayers = (layers: Layer[]): void => {
    this.layers = layers;
  };
}

export default MapStore;
