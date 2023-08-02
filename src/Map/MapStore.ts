import MapView from "@arcgis/core/views/MapView";
import Point from "@arcgis/core/geometry/Point";
import Extent from "@arcgis/core/geometry/Extent";
import { action, makeObservable, observable } from "mobx";
class MapStore {
  public mapView?: MapView = undefined;
  public center = new Point();
  public extent = new Extent();
  public rotation: number = 0;

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor() {
    makeObservable(this, {
      mapView: observable,
      center: observable,
      extent: observable,
      rotation: observable,
      layerVisibility: observable,
      setMapView: action,
      setCenter: action,
      setExtent: action,
      setRotation: action,
    });
  }

  setMapView = (mapView: MapView): void => {
    this.mapView = mapView;
  };
  setCenter = (center: Point): void => {
    this.center = center;
  };
  setExtent = (extent: Extent): void => {
    this.extent = extent;
  };
  setRotation = (rotation: number): void => {
    this.rotation = rotation;
  };
}

export default MapStore;
