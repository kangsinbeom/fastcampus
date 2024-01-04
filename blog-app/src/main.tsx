import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthcontextProvider } from "context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthcontextProvider>
    <Router>
      <App />
    </Router>
  </AuthcontextProvider>
);
