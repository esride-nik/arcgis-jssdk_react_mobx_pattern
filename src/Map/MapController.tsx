import Point from "@arcgis/core/geometry/Point";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as React from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

// import { reaction } from "mobx";
import { Stores } from "../Stores/Stores";

export default class MapController {
  private stores: Stores | undefined;

  setStores = (stores: Stores): void => {
    this.stores = stores;
  };

  private readonly graphicsLayer: GraphicsLayer = new GraphicsLayer({
    listMode: "hide",
  });

  public map!: Map;

  mapNode = React.createRef<HTMLDivElement>();

  initMap = (): void => {
    console.debug("init Map", this);
    this.map = new Map({
      basemap: this.stores?.mapStore.basemap,
    });

    const mapView = new MapView({
      map: this.map,
      container: this.mapNode.current ?? undefined,
      center: this.stores?.mapStore.center,
      ui: { components: [] },
    });

    mapView.when((v: MapView) => {
      this.stores?.mapStore.setMapView(v);
      v.watch("center", (center: Point) => {
        this.stores?.mapStore.setCenter(center);
      });
      v.map.add(this.graphicsLayer);
    });

    // reaction(
    //   () => this.stores?.mapStore.layers,
    //   () => {
    //     this.initLayers();
    //   }
    // );
  };

  public readonly getGraphicsLayer = (): GraphicsLayer => {
    return this.graphicsLayer;
  };
}
