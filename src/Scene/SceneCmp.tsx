import * as React from "react";
import { useEffect } from "react";
import { useSceneContext } from "./useSceneContext";
import "./Scene.css";
import { observer } from "mobx-react";

interface SceneCmpProps {}

const SceneCmp: React.FC<SceneCmpProps> = observer((props: SceneCmpProps) => {
  const sceneContext = useSceneContext();

  // scene must be initialized after first render, because we need the DOM node ref
  useEffect(sceneContext.initScene, []);

  return <div ref={sceneContext.sceneNode} id="scene" />;
});

export default SceneCmp;
