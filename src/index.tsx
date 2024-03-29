import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/app/app";

import { store } from "./services/store";

import { BrowserRouter } from "react-router-dom";

// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
