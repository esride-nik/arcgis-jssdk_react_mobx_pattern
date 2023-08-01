import SceneCmp from "Scene/SceneCmp";
import "./App.css";
import MapCmp from "./Map/MapCmp";
import { MapProvider } from "./Map/MapProvider";
import StatusCmp from "./Status/StatusCmp";
import { SceneProvider } from "Scene/SceneProvider";

function App() {
  return (
    <div className="App">
      <MapProvider>
      <SceneProvider>
        <MapCmp></MapCmp>
        <SceneCmp></SceneCmp>
      </SceneProvider>
      </MapProvider>
      <StatusCmp></StatusCmp>
    </div>
  );
}

export default App;
