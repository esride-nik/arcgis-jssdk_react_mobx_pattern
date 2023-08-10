import SceneCmp from "Scene/SceneCmp";
import "./App.css";
import MapCmp from "./Map/MapCmp";
import { MapProvider } from "./Map/MapProvider";
import StatusCmp from "./Status/StatusCmp";
import { SceneProvider } from "Scene/SceneProvider";

import "@arcgis/core/assets/esri/themes/light/main.css";
import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import { CalciteShell, CalcitePanel, CalciteShellPanel } from '@esri/calcite-components-react';
import { setAssetPath } from "@esri/calcite-components/dist/components";

setAssetPath("https://unpkg.com/@esri/calcite-components/dist/calcite/assets");

/*
resizable feature:

Adam Tirella 18:28
Niklas Köhn (Guest) - Shell Panel css width: https://developers.arcgis.com/calcite-design-system/components/shell-panel/#styles
codepen: https://codepen.io/mac_and_cheese/pen/NWEVwEa?editors=1000


 */


function App() {
  console.log('app');
  return (
    <CalciteShell className="App">
      <MapProvider>
      <SceneProvider>
        <div slot="header"><StatusCmp></StatusCmp></div>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <MapCmp></MapCmp>
        </CalciteShellPanel>
        <CalcitePanel>
          <SceneCmp></SceneCmp>
        </CalcitePanel>
      </SceneProvider>
      </MapProvider>
    </CalciteShell>
  );
}

export default App;
