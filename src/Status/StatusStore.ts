import { action, makeObservable, observable } from "mobx";
import AppStore from "../Stores/AppStore";

class StatusStore {
  private readonly appStore: AppStore;
  statusMessage: string = "";
  changeCounter: number = 0;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
    makeObservable(this, {
      statusMessage: observable,
      changeCounter: observable,
      setStatusMessage: action,
      setChangeCounter: action
    });
  }
  setStatusMessage(s: string) {
    this.statusMessage = s;
  }
  setChangeCounter(c: number) {
    this.changeCounter = c;
  }
}

export default StatusStore;
