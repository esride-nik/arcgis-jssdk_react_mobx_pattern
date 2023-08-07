import Map from "@arcgis/core/Map";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import * as React from "react";
import { Stores } from "../Stores/Stores";
import SceneStore from "./SceneStore";
import { Config } from "Config/types/config";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

export default class SceneController {
  private stores!: Stores | undefined;
  private sceneStore!: SceneStore;
  private config!: Config;
  public scene!: Map;
  public sceneView!: SceneView;
  private buildingLayer!: SceneLayer;

  // setStores needs to be called with a valid object before the rest of the class works
  setStores = (stores: Stores): void => {
    this.stores = stores;
    this.sceneStore = stores.sceneStore;
    this.config = stores.appStore.config;
  };

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
      camera: {"position":{"spatialReference":{"wkid":102100},"x":256022.17269005647,"y":6253215.566099106,"z":251.75521506089717},"heading":295.1691905190077,"tilt":77.58617215775432},
    });

    this.addFeatureLayer();

    // making sure that sceneView is initialized
    this.sceneView.when((v: SceneView) => {
      this.sceneStore.setSceneView(v);
      reactiveUtils.watch(
        () => v.center,
        (value) => this.sceneStore.setCenter(value)
      );
      reactiveUtils.watch(
        () => v.extent,
        (value) => this.sceneStore.setExtent(value)
      );
      reactiveUtils.watch(
        () => v.camera,
        (value) => this.sceneStore.setCamera(value)
      );

      const sceneLayers = this.scene.allLayers.filter(
        (s: __esri.Layer) => s.title === "OpenStreetMap 3D Buildings"
      );
      this.buildingLayer = sceneLayers.getItemAt(0) as SceneLayer;
      this.setSceneRenderer();
    });
  };

  public setSceneRenderer = (attribute: string = "height") => {
    if (!this.buildingLayer) return;

    if (attribute === "height") {
      const renderer = {
        type: "simple",
        symbol: {
          type: "mesh-3d",
          symbolLayers: [
            {
              type: "fill",
            },
          ],
        },
        visualVariables: [
          {
            type: "color",
            field: "height",
            stops: [
              {
                value: 5,
                color: [253, 255, 200, 1],
                label: "5",
              },
              {
                value: 250,
                color: [50, 150, 250, 1],
                label: "250",
              },
            ],
          },
        ],
      } as unknown as __esri.Renderer;

      this.buildingLayer.renderer = renderer;
    } else if (attribute === "levels") {
      const renderer = {
        type: "simple",
        symbol: {
          type: "mesh-3d",
          symbolLayers: [
            {
              type: "fill",
            },
          ],
        },
        visualVariables: [
          {
            type: "color",
            field: "building_levels",
            stops: [
              {
                value: 5,
                color: [253, 255, 200, 1],
                label: "5",
              },
              {
                value: 60,
                color: [150, 50, 250, 1],
                label: "60",
              },
            ],
          },
        ],
      } as unknown as __esri.Renderer;

      this.buildingLayer.renderer = renderer;
    }
  };

  private addFeatureLayer() {
    const renderer = {
      type: "simple",
      symbol: {
        type: "polygon-3d",
        symbolLayers: [
          {
            type: "fill",
          },
        ],
      },
      visualVariables: [
        {
          type: "color",
          field: "POPULATION",
          stops: [
            {
              value: 10000,
              color: [230, 200, 41, 0.2],
              label: "10000",
            },
            {
              value: 250000,
              color: [153, 83, 41, 0.6],
              label: "250000",
            },
          ],
        },
      ],
    } as unknown as __esri.RendererProperties;

    const arr_fl = new FeatureLayer({
      url: "https://services.arcgis.com/d3voDfTFbHOCRwVR/ArcGIS/rest/services/arrondissements_municipaux_Paris_Lyon_Marseilles_L93/FeatureServer/0",
      renderer: renderer,
    });
    this.scene.add(arr_fl);
  }
}
