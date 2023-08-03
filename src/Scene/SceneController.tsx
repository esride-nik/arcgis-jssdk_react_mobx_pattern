import Map from "@arcgis/core/Map";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Camera from "@arcgis/core/Camera";
import * as React from "react";
import { Stores } from "../Stores/Stores";
import SceneStore from "./SceneStore";
import { Config } from "Config/types/config";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

export default class SceneController {
  private stores!: Stores | undefined;
  private sceneStore!: SceneStore;
  private config!: Config;

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
      // camera: new Camera()
    });


    const renderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "polygon-3d", // autocasts as new PolygonSymbol3D()
        symbolLayers: [
          {
            type: "extrude" // autocasts as new ExtrudeSymbol3DLayer()
          }
        ]
      },
      visualVariables: [
        {
          type: "size",
          field: "POPULATION",
          stops: [
            {
              value: 10000,
              size: 10,
              label: "10,000"
            },
            {
              value: 250000,
              size: 2500,
              label: ">250,000"
            }
          ]
        },
        {
          type: "color",
          field: "POPULATION",
          stops: [
            {
              value: 10000,
              color: [230, 200, 41, 0.2],
              label: "10"
            },
            {
              value: 250000,
              color: [153, 83, 41, 0.6],
              label: "80"
            }
          ]
        }
      ]
    } as unknown as __esri.RendererProperties;

    const arr_fl = new FeatureLayer({
      url: 'https://services.arcgis.com/d3voDfTFbHOCRwVR/ArcGIS/rest/services/arrondissements_municipaux_Paris_Lyon_Marseilles_L93/FeatureServer/0',
      renderer: renderer
    });
    this.scene.add(arr_fl);

    // making sure that sceneView is initialized
    this.sceneView.when((v: SceneView) => {
      this.sceneStore.setSceneView(v);
      reactiveUtils.watch(() => v.center, (value) => this.sceneStore.setCenter(value));
      reactiveUtils.watch(() => v.extent, (value) => this.sceneStore.setExtent(value));
      reactiveUtils.watch(() => v.camera, (value) => this.sceneStore.setCamera(value));
    });
  };
}
