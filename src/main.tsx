
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import "./pages/details/details.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="908694421130-d3sv0uf51ip762i8u1410iuv4qpi8md2.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
