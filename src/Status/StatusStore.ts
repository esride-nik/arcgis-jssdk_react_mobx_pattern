import { makeObservable, observable } from "mobx";
import AppStore from "../Stores/AppStore";

class StatusStore {
  private readonly appStore: AppStore;
  statusMessage: string = "";

  constructor(appStore: AppStore) {
    this.appStore = appStore;
    makeObservable(this, {
      statusMessage: observable,
    });
  }
}

export default StatusStore;
