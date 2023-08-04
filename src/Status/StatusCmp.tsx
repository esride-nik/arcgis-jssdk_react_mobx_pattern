import * as React from "react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useStores } from "../Stores/useStores";
import { useMapContext } from "../Map/useMapContext";
import "./Status.css";
import { useSceneContext } from "../Scene/useSceneContext";

import '@esri/calcite-components/dist/components/calcite-button';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-chip';
import '@esri/calcite-components/dist/components/calcite-avatar';
import { CalciteButton, CalcitePanel,CalciteChip, CalciteAvatar } from '@esri/calcite-components-react';

interface StatusCmpProps {}

const StatusCmp: React.FC<StatusCmpProps> = observer(
  (props: StatusCmpProps) => {
    const { statusStore, mapStore } = useStores();
    const mapContext = useMapContext();
    const sceneContext = useSceneContext();

    const goSomewhere = () => {
      mapContext.mapView.goTo({ target: [0,0], zoom: 5 }, {animate: true, duration: 3000})
      sceneContext.sceneView.goTo({ target: [0,0], zoom: 5 }, {animate: true, duration: 3000})
    }

    useEffect(() => {
      statusStore.setChangeCounter(statusStore.changeCounter + 1);
      statusStore.setStatusMessage(`Center changed ${statusStore.changeCounter} times.`);
    }, [statusStore, mapStore.center]);

    return (
      <div id="status">
      <CalcitePanel heading={statusStore.statusMessage}>
        <CalciteButton slot='header-actions-end' onClick={goSomewhere} appearance='solid'>
          Somewhere in the middle
        </CalciteButton>
        <CalciteChip slot='header-actions-start' value="xy" appearance="outline-fill" className='avatarXy'>
          <CalciteAvatar slot="image" full-name="x y"></CalciteAvatar>
            {mapStore.center.x.toFixed(2)} / {mapStore.center.y.toFixed(2)} 
        </CalciteChip>
      </CalcitePanel>
      </div>
    );
  }
);

export default StatusCmp;
