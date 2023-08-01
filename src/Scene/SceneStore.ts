import SceneView from "@arcgis/core/views/SceneView";
import Point from "@arcgis/core/geometry/Point";
import { action, makeObservable, observable } from "mobx";
class SceneStore {
  public sceneView?: SceneView = undefined;
  public center = new Point();

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor() {
    makeObservable(this, {
      sceneView: observable,
      center: observable,
      layerVisibility: observable,
      setSceneView: action,
      setCenter: action,
    });
  }

  setSceneView = (sceneView: SceneView): void => {
    this.sceneView = sceneView;
  };
  setCenter = (center: Point): void => {
    this.center = center;
  };
}

export default SceneStore;
