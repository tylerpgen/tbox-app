import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      {console.log("process.env.GOOGLE_API_TOKEN", process.env.GOOGLE_API_TOKEN)}
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
