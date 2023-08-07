import SceneView from "@arcgis/core/views/SceneView";
import Point from "@arcgis/core/geometry/Point";
import Extent from "@arcgis/core/geometry/Extent";
import Camera from "@arcgis/core/Camera";
import { action, makeObservable, observable } from "mobx";
class SceneStore {
  public sceneView?: SceneView = undefined;
  public center = new Point();
  public extent = new Extent();
  public camera = new Camera();

  public readonly layerVisibility: {
    [layerId: string]: boolean | undefined;
  } = {};

  constructor() {
    makeObservable(this, {
      sceneView: observable,
      center: observable,
      extent: observable,
      camera: observable,
      layerVisibility: observable,
      setSceneView: action,
      setCenter: action,
      setExtent: action,
      setCamera: action,
    });
  }

  setSceneView = (sceneView: SceneView): void => {
    this.sceneView = sceneView;
  };
  setCenter = (center: Point): void => {
    this.center = center;
  };
  setExtent = (extent: Extent): void => {
    this.extent = extent;
  };
  setCamera = (camera: Camera): void => {
    this.camera = camera;
    console.log(JSON.stringify(camera))
  };
}

export default SceneStore;
