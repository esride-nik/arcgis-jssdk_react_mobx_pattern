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
      statusStore.changeCounter++;
      statusStore.statusMessage = `Center changed ${statusStore.changeCounter} times.`;
    }, [statusStore]);

    return (
      <div id="status">
        <span>{statusStore.statusMessage}</span>
        <span>{mapStore.center.x.toFixed(7)} | {mapStore.center.y.toFixed(7)}</span>
      </div>
    );
  }
);

export default StatusCmp;
