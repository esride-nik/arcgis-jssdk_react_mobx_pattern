import { makeObservable } from "mobx";
import AppStore from "./AppStore";
import MapStore from "../Map/MapStore";
import StatusStore from "../Status/StatusStore";
import { Config } from "../Config/types/config";
import SceneStore from "Scene/SceneStore";

export interface IStores {
  appStore: AppStore;
  mapStore: MapStore;
  sceneStore: SceneStore;
  statusStore: StatusStore;
}

export class Stores implements IStores {
  appStore: AppStore;
  mapStore: MapStore;
  sceneStore: SceneStore;
  statusStore: StatusStore;

  constructor(config: Config) {
    makeObservable(this, {});

    // initialize all stores in correct order
    this.appStore = new AppStore(config);
    this.mapStore = new MapStore();
    this.sceneStore = new SceneStore();
    this.statusStore = new StatusStore();
  }
}
