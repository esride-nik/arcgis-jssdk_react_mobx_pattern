import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./Stores/StoreProvider";
import { getConfiguration } from "./Config/configuration";

let configuration: any = undefined;
(async () => {
  configuration = await getConfiguration();
  
  console.log('index');

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <StoreProvider config={configuration}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StoreProvider>
  );
})();
