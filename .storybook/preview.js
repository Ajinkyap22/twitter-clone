import React from "react";
import { MemoryRouter } from "react-router-dom";
import "../src/index.scss";
import "../src/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// redux store
import { Provider } from "react-redux";
import { store } from "../src/app/store";

export const decorators = [
  // router
  (Story) => (
    <MemoryRouter initialEntries={["/"]}>
      <Story />
    </MemoryRouter>
  ),
  // redux
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
