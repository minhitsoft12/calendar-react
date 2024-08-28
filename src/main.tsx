import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "react-datepicker/dist/react-datepicker.min.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./lib/store.ts";

const storeConfig = store;

storeConfig.subscribe(() => {
  localStorage.setItem("states_management", JSON.stringify(store.getState()));
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={storeConfig}>
      <App />
    </Provider>
  </StrictMode>,
);
