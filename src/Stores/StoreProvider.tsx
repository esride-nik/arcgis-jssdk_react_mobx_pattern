/* eslint-disable react/function-component-definition */
import { Provider } from "mobx-react";
import * as React from "react";
import { Config } from "../Config/types/config";
import { Stores } from "./Stores";

interface StoreProviderProps {
  children: React.ReactNode;
  config: Config;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({
  children,
  config,
}) => {
  const stores = React.useMemo(() => {
    const result = new Stores(config);
    return result;
  }, [config]);

  return <Provider {...stores}>{children}</Provider>;
};
