import SceneCmp from "Scene/SceneCmp";
import "./App.css";
import MapCmp from "./Map/MapCmp";
import { MapProvider } from "./Map/MapProvider";
import StatusCmp from "./Status/StatusCmp";
import { SceneProvider } from "Scene/SceneProvider";

import '@esri/calcite-components/dist/components/calcite-shell';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import { CalciteShell, CalciteShellPanel } from '@esri/calcite-components-react';

function App() {
  return (
    <CalciteShell className="App">
      <MapProvider>
      <SceneProvider>
        <div slot="header"><StatusCmp></StatusCmp></div>
        <CalciteShellPanel slot="panel-start" position="start" resizable>
          <MapCmp></MapCmp>
        </CalciteShellPanel>
        <SceneCmp></SceneCmp>
      </SceneProvider>
      </MapProvider>
    </CalciteShell>
  );
}

export default App;
