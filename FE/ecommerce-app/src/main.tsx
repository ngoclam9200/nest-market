import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import {GoogleOAuthProvider} from "@react-oauth/google";
const CLIENT_ID = "523622597427-n65p6g8no36rphrgj4d9cevk2e1jsfec.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <CookiesProvider>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </CookiesProvider>
  // </React.StrictMode>,
);
