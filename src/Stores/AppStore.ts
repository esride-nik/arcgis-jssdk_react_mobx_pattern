// import { i18n, TOptions } from 'i18next';
import { makeObservable, observable, action } from "mobx";
// import TConfig from './config';

class AppStore {
  // public config: TConfig = window.config;

  // eslint-disable-next-line class-methods-use-this
  // public t: (key: string, options?: TOptions) => string = () => '';

  // public i18next?: i18n;

  // public lng!: string;

  // public supportedLng! : string[];

  public width = window.innerWidth;

  public height = window.innerHeight;

  public readonly handleResize = (): void => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };

  public constructor() {
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
