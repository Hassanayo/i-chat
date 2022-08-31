import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import MessageProvider from "./context/MessageContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <MessageProvider>
      <App />
    </MessageProvider>
  </AuthProvider>
);
