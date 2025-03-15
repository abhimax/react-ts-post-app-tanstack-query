// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import QueryClientProviderWrapper from "./QueryClientProvider";

ReactDOM.render(
  <QueryClientProviderWrapper>
    <App />
  </QueryClientProviderWrapper>,
  document.getElementById("root")
);
