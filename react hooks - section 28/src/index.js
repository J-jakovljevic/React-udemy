import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import AuthContexProvider from "./contex/auth-contex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContexProvider>      {/* we can listen to the contex from everywhere in the app */}
    <App />
  </AuthContexProvider>
);
