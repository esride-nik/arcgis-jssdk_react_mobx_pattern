import { makeObservable } from "mobx";
import AppStore from "./AppStore";
import MapStore from "../Map/MapStore";
import StatusStore from "../Status/StatusStore";
import { Config } from "../Config/types/config";

export interface IStores {
  appStore: AppStore;
  mapStore: MapStore;
  statusStore: StatusStore;
}

export class Stores implements IStores {
  appStore: AppStore;
  mapStore: MapStore;
  statusStore: StatusStore;

  constructor(config: Config) {
    makeObservable(this, {});

    // initialize all stores in correct order
    this.appStore = new AppStore(config);
    this.mapStore = new MapStore(this.appStore);
    this.statusStore = new StatusStore(this.appStore);
  }
}
