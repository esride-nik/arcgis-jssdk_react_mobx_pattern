import * as React from "react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStores } from "../Stores/useStores";
import "./Status.css";

interface StatusCmpProps {}

const StatusCmp: React.FC<StatusCmpProps> = observer(
  (props: StatusCmpProps) => {
    const { statusStore, mapStore } = useStores();

    useEffect(() => {
      statusStore.setChangeCounter(statusStore.changeCounter + 1);
      statusStore.setStatusMessage(`Center changed ${statusStore.changeCounter} times.`);
    }, [statusStore, mapStore.center]);

    return (
      <div id="status">
        <span>{statusStore.statusMessage}</span>
        <span>{mapStore.center.x} / {mapStore.center.y}</span>
      </div>
    );
  }
);

export default StatusCmp;
