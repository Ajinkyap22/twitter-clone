import React from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Auth0ProviderWithHistory from "./auth/auth0ProviderWithHistory";
import { ThemeProvider } from "contexts/ThemeContext";

import "./index.scss";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
);
