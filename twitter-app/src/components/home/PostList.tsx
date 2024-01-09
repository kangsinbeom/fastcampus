import { useContext, useEffect, useState } from "react";

import { PostProps } from "utils/type";
import PostBox from "../posts/PostBox";
import AuthContext from "contexts/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";

const PostList = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postQuery = query(postsRef, orderBy("createdAt", "desc"));

      onSnapshot(postQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="post">
      {posts.length > 0 ? (
        posts.map((post) => <PostBox key={post.id} post={post} />)
      ) : (
        <div className="post__no-posts">
          <div className="post__text">게시글이 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default PostList;
