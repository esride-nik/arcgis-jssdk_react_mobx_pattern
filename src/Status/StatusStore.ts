import { action, makeObservable, observable } from "mobx";

class StatusStore {
  statusMessage: string = "";
  changeCounter: number = 0;

  constructor() {
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
