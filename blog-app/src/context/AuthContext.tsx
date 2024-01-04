import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
});

export const AuthcontextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [CurrentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: CurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
