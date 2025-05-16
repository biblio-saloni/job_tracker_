import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
