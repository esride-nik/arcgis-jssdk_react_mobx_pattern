import Map from "@arcgis/core/Map";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import * as React from "react";
import { Stores } from "../Stores/Stores";
import SceneStore from "./SceneStore";
import { Config } from "Config/types/config";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

export default class SceneController {
  private stores!: Stores | undefined;
  private sceneStore!: SceneStore;
  private config!: Config;
  private fl_arr!: FeatureLayer;

  // setStores needs to be called with a valid object before the rest of the class works
  setStores = (stores: Stores): void => {
    this.stores = stores;
    this.sceneStore = stores.sceneStore;
    this.config = stores.appStore.config;
  };

  public scene!: Map;
  public sceneView!: SceneView;

  sceneNode = React.createRef<HTMLDivElement>();

  initScene = (): void => {
    if (!this.stores)
      throw new Error(
        `setStores() needs to be called with a valid object before the rest of the SceneController works.`
      );

    this.scene = new WebScene({
      portalItem: {
        id: this.config.webSceneItemId,
      },
    });
    this.sceneView = new SceneView({
      map: this.scene,
      container: this.sceneNode.current ?? undefined,
    });

    this.fl_arr = new FeatureLayer({
      url: 'https://services.arcgis.com/d3voDfTFbHOCRwVR/ArcGIS/rest/services/arrondissements_municipaux_Paris_Lyon_Marseilles_L93/FeatureServer/0'
    })
    this.scene.add(this.fl_arr);

    // making sure that sceneView is initialized
    this.sceneView.when((v: SceneView) => {
      this.sceneStore.setSceneView(v);
      reactiveUtils.watch(() => v.center, (value) => this.sceneStore.setCenter(value));
      reactiveUtils.watch(() => v.extent, (value) => this.sceneStore.setExtent(value));
      reactiveUtils.watch(() => v.camera, (value) => this.sceneStore.setCamera(value));
    });
  };
}
