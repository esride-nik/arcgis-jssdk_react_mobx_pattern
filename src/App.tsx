import SceneCmp from "Scene/SceneCmp";
import "./App.css";
import MapCmp from "./Map/MapCmp";
import { MapProvider } from "./Map/MapProvider";
import StatusCmp from "./Status/StatusCmp";
import { SceneProvider } from "Scene/SceneProvider";

function App() {
  console.log('app');
  return (
      <MapProvider>
      <SceneProvider>
        <div slot="header"><StatusCmp></StatusCmp></div>
        <div slot="panel-start">
          <MapCmp></MapCmp>
        </div>
        <div>
          <SceneCmp></SceneCmp>
        </div>
      </SceneProvider>
      </MapProvider>
  );
}

export default App;
