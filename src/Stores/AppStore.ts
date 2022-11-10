// import { i18n, TOptions } from 'i18next';
import { makeObservable, observable, action } from "mobx";
import { Config } from "../Config/types/config";
// import TConfig from './config';

class AppStore {
  public config: Config;

  public width = window.innerWidth;

  public height = window.innerHeight;

  public readonly handleResize = (): void => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };

  public constructor(config: Config) {
    this.config = config;

    this.handleResize();
    window.addEventListener("resize", () => this.handleResize());

    makeObservable(this, {
      width: observable,
      height: observable,
      handleResize: action,
    });
  }
}

export default AppStore;
