import AuthContext from "contexts/AuthContext";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FollowingUserData, PostProps } from "utils/type";

const FollowingBox = ({ post }: { post: PostProps }) => {
  const { user } = useContext(AuthContext);
  const [postFollowers, setPostFollowers] = useState<any>([]);

  const onClickFollow = async (e: any) => {
    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user.uid);

        await setDoc(
          followingRef,
          { users: arrayUnion({ id: post.id }) },
          { merge: true }
        );

        const followRef = doc(db, "follow", user.uid);

        await setDoc(
          followRef,
          { users: arrayUnion({ id: post.id }) },
          { merge: true }
        );
        toast.success("팔로잉하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDeleteFollow = async (e: any) => {
    try {
      if (user?.uid) {
        const followingRef = doc(db, "following", user.uid);

        await updateDoc(followingRef, { users: arrayRemove({ id: post.id }) });

        const followRef = doc(db, "follow", user.uid);

        await updateDoc(followRef, { users: arrayRemove({ id: post.id }) });
        toast.success("팔로우를 취소했습니다");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getFollowers = useCallback(async () => {
    const ref = doc(db, "follower", post.uid);
    setPostFollowers([]);
    onSnapshot(ref, (doc) => {
      doc
        ?.data()
        ?.users?.map((user: FollowingUserData) =>
          setPostFollowers((prev: FollowingUserData[]) =>
            prev ? [...prev, user?.id] : []
          )
        );
    });
  }, [post.uid]);

  useEffect(() => {
    if (post.uid) getFollowers();
  }, [post.uid, getFollowers]);
  return (
    <>
      {user?.uid !== post.uid && postFollowers?.includes(user?.uid) ? (
        <button className="post__follow-btn" onClick={onClickDeleteFollow}>
          Following
        </button>
      ) : (
        <button onClick={onClickFollow} className="post__following-btn">
          Follower
        </button>
      )}
    </>
  );
};

export default FollowingBox;
