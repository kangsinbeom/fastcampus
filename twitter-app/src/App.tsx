import Router from "components/Router";
import Layout from "components/Layout";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/loader";
import { RecoilRoot } from "recoil";
function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthentication, setIsAuthentication] = useState<boolean>(
    !!auth?.currentUser
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthentication(true);
      } else {
        setIsAuthentication(false);
      }
      setInit(true);
    });
  }, [auth]);
  return (
    <RecoilRoot>
      <Layout>
        <ToastContainer
          theme="dark"
          autoClose={1000}
          hideProgressBar
          newestOnTop
        />
        {init ? <Router isAuthentication={isAuthentication} /> : <Loader />}
      </Layout>
    </RecoilRoot>
  );
}

export default App;
