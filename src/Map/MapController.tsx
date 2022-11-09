import Point from "@arcgis/core/geometry/Point";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as React from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

// import { reaction } from "mobx";
import { Stores } from "../Stores";

export default class MapController {
  private readonly stores = Stores.getInstance();
  private readonly graphicsLayer: GraphicsLayer = new GraphicsLayer({
    listMode: "hide",
  });

  public map!: Map;

  mapNode = React.createRef<HTMLDivElement>();

  initMap = (): void => {
    // // Only JSON Format for Queries
    // const jsonResponse:__esri.RequestInterceptor = {
    //     after: (response: any) => {
    //         if (response?.data?.supportedQueryFormats !== null && response?.data?.supportedQueryFormats !== undefined) {
    //             response.data.supportedQueryFormats = 'JSON';
    //         }
    //     },
    // };
    // if (esriConfig.request.interceptors) {
    //     esriConfig.request.interceptors.push(jsonResponse);
    // } else {
    //     esriConfig.request.interceptors = [jsonResponse];
    // }

    console.debug("init Map", this);
    this.map = new Map({
      basemap: this.stores.mapStore.basemap,
    });

    const mapView = new MapView({
      map: this.map,
      container: this.mapNode.current ?? undefined,
      center: this.stores.mapStore.center,
      scale: this.stores.mapStore.scale,
      rotation: this.stores.mapStore.rotation,
      ui: { components: [] },
    });

    mapView.when((v: MapView) => {
      this.stores.mapStore.setMapView(v);
      v.watch("center", (center: Point) => {
        this.stores.mapStore.setCenter(center);
      });
      v.map.add(this.graphicsLayer);
    });

    // reaction(
    //   () => this.stores.mapStore.layers,
    //   () => {
    //     this.initLayers();
    //   }
    // );
  };

  public readonly getGraphicsLayer = (): GraphicsLayer => {
    return this.graphicsLayer;
  };
}
