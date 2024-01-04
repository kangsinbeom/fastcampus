import AuthContext from "context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext } from "react";

const Profile = () => {
  // const auth = getAuth(app);
  // const onSignOut = async () => {
  //   try {
  //     const auth = getAuth(app);
  //     await signOut(auth);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // return (
  //   <div>
  //     <div>{auth.currentUser?.email}</div>
  //     <div>{auth.currentUser?.displayName || "사용자"}</div>
  //     <button onClick={onSignOut}>로그아웃</button>
  //   </div>
  // );
  const { user } = useContext(AuthContext);
  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>{user?.email}</div>
      <div>{user?.displayName || "사용자"}</div>
      <button onClick={onSignOut}>로그아웃</button>
    </div>
  );
};

export default Profile;
