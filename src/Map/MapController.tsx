import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Compass from "@arcgis/core/widgets/Compass";
import Expand from "@arcgis/core/widgets/Expand";
import * as React from "react";
import { Stores } from "../Stores/Stores";
import MapStore from "./MapStore";
import { Config } from "Config/types/config";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";

export default class MapController {
  private stores!: Stores | undefined;
  private mapStore!: MapStore;
  private config!: Config;

  // setStores needs to be called with a valid object before the rest of the class works
  setStores = (stores: Stores): void => {
    this.stores = stores;
    this.mapStore = stores.mapStore;
    this.config = stores.appStore.config;
  };

  public map!: Map;
  public mapView!: MapView;

  mapNode = React.createRef<HTMLDivElement>();

  initMap = (): void => {
    if (!this.stores)
      throw new Error(
        `setStores() needs to be called with a valid object before the rest of the MapController works.`
      );

    this.map = new WebMap({
      portalItem: {
        id: this.config.webMapItemId,
      },
    });
    this.mapView = new MapView({
      map: this.map,
      container: this.mapNode.current ?? undefined,
    });

    const compass = new Compass({
      view: this.mapView
    });
    this.mapView.ui.add(compass, "top-left");

    const basemapGallery = new BasemapGallery({
      view: this.mapView
    });
    const basemapGalleryExpand = new Expand({
      expandIcon: "basemap",  // see https://developers.arcgis.com/calcite-design-system/icons/
      view: this.mapView,
      content: basemapGallery
    } as unknown as __esri.ExpandProperties);
    this.mapView.ui.add(basemapGalleryExpand, "bottom-right");

    // making sure that mapView is initialized
    this.mapView.when((v: MapView) => {
      this.mapStore.setMapView(v);
      reactiveUtils.watch(() => v.center, (value) => this.mapStore.setCenter(value));
    });
  };
}
