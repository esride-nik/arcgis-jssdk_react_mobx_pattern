import * as React from "react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStores } from "../Stores/useStores";
import "./Status.css";

interface StatusCmpProps {}

const StatusCmp: React.FC<StatusCmpProps> = observer(
  (props: StatusCmpProps) => {
    const { statusStore } = useStores();

    useEffect(() => {
      statusStore.setChangeCounter(statusStore.changeCounter + 1);
      statusStore.setStatusMessage(`Center changed ${statusStore.changeCounter} times.`);
    }, [statusStore]);

    return (
      <div id="status">
        <span>{statusStore.statusMessage}</span>
      </div>
    );
  }
);

export default StatusCmp;
