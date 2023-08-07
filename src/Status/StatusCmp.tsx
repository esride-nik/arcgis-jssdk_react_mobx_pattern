import * as React from "react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStores } from "../Stores/useStores";
import { useMapContext } from "../Map/useMapContext";
import "./Status.css";
import { useSceneContext } from "../Scene/useSceneContext";

interface StatusCmpProps {}

const StatusCmp: React.FC<StatusCmpProps> = observer(
  (props: StatusCmpProps) => {
    const { statusStore, mapStore } = useStores();
    const mapContext = useMapContext();
    const sceneContext = useSceneContext();

    const goSomewhere = () => {
      mapContext.mapView.goTo(
        { target: [0, 0], zoom: 5 },
        { animate: true, duration: 3000 }
      );
      sceneContext.sceneView.goTo(
        { target: [0, 0], zoom: 5 },
        { animate: true, duration: 3000 }
      );
    };

    const changeSceneRenderer = (v: any) => {
      sceneContext.setSceneRenderer(v.target.value);
    };

    useEffect(() => {
      statusStore.setChangeCounter(statusStore.changeCounter + 1);
      statusStore.setStatusMessage(
        `Center changed ${statusStore.changeCounter} times.`
      );
    }, [statusStore, mapStore.center]);

    return (
      <div id="status">
        <div>
          {statusStore.statusMessage}
          <button slot="header-actions-end" onClick={goSomewhere}>
            Somewhere in the middle
          </button>
          <div>
            <input
              type="radio"
              name="scenerenderer"
              value="height"
              title="height"
              onClick={changeSceneRenderer}
              defaultChecked
            />
            <label>height</label>
            <input
              type="radio"
              name="scenerenderer"
              value="levels"
              title="levels"
              onClick={changeSceneRenderer}
            />
            <label>levels</label>
          </div>
          <div>{mapStore.center.x.toFixed(2)} / {mapStore.center.y.toFixed(2)}</div>
        </div>
      </div>
    );
  }
);

export default StatusCmp;
