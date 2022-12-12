import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Auth0ProviderWithHistory from "./auth/auth0ProviderWithHistory";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
);
