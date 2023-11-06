import * as React from "react";
import SceneController from "./SceneController";
import { SceneContext } from "./SceneProvider";

export const useSceneContext = (): SceneController => React.useContext(SceneContext);
