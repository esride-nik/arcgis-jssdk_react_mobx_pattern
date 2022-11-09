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
      statusStore.statusMessage = `Status ${Math.random()}`;
    }, [statusStore, mapStore.center]);

    return (
      <div id="status">
        <p>{statusStore.statusMessage}</p>
        <p>
          {mapStore.center.x} / {mapStore.center.y}
        </p>
      </div>
    );
  }
);

export default StatusCmp;
