import * as React from "react";
import { useStores } from "../Stores/useStores";
import SceneController from "./SceneController";

interface SceneProviderProps {
  children: React.ReactNode;
}

const sceneController = new SceneController();

export const SceneContext = React.createContext<SceneController>(sceneController);

export const SceneProvider: React.FC<SceneProviderProps> = ({ children }) => {
  const stores = useStores();
  sceneController.setStores(stores);
  return (
    <SceneContext.Provider value={sceneController}>{children}</SceneContext.Provider>
  );
};
