import * as React from "react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStores } from "../Stores/useStores";
import "./Status.css";
import { useMapContext } from "../Map/useMapContext";

interface StatusCmpProps {}

const StatusCmp: React.FC<StatusCmpProps> = observer(
  (props: StatusCmpProps) => {
    const { statusStore, mapStore } = useStores();
    // const mapContext = useMapContext();
    
    const goSomewhere = () => {
      // mapContext.mapView.goTo([0,0]);
      console.log('lalala');
    }

    useEffect(() => {
      statusStore.setChangeCounter(statusStore.changeCounter + 1);
      statusStore.setStatusMessage(`Center changed ${statusStore.changeCounter} times.`);
    }, [statusStore, mapStore.center]);

    return (
      <div id="status">
        <span>{statusStore.statusMessage}</span>
        <span>{mapStore.center.x} / {mapStore.center.y}</span>
        <button onClick={goSomewhere}>Somewhere in the middle</button>
      </div>
    );
  }
);

export default StatusCmp;
