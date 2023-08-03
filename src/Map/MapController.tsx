import Map from "@arcgis/core/Map";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Compass from "@arcgis/core/widgets/Compass";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as React from "react";
import { Stores } from "../Stores/Stores";
import MapStore from "./MapStore";
import { Config } from "Config/types/config";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

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

    let compass = new Compass({
      view: this.mapView
    });
    this.mapView.ui.add(compass, "top-left");

    const renderer = {
            "type": "simple",
            "symbol": {
                "type": "simple-fill",
                "style": "solid",
                "color": [
                    255,
                    255,
                    190,
                    0.6
                ],
                "outline": {
                    "type": "simple-line",
                    "style": "solid",
                    "color": [
                        255,
                        0,
                        0,
                        0.8
                    ],
                    "width": 1
                }
            }
        } as unknown as __esri.RendererProperties;
    const arr_fl = new FeatureLayer({
      url: 'https://services.arcgis.com/d3voDfTFbHOCRwVR/ArcGIS/rest/services/arrondissements_municipaux_Paris_Lyon_Marseilles_L93/FeatureServer/0',
      renderer: renderer
    });
    this.map.add(arr_fl);

    // making sure that mapView is initialized
    this.mapView.when((v: MapView) => {
      this.mapStore.setMapView(v);
      reactiveUtils.watch(() => v.center, (value) => this.mapStore.setCenter(value));
    });
  };
}
