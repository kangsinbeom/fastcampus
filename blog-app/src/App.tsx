import Router from "./Router";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  return (
    <>
      {init ? <Router isAuthenticated={isAuthenticated} /> : <div>loader</div>}
    </>
  );
}

export default App;
