import PostBox from "components/posts/PostBox";
import AuthContext from "contexts/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { PostProps } from "utils/type";

const SearchPage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);

  const onChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagQuery(e.target.value.trim());
  };
  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(
        postsRef,
        where("hasTags", "array-contains-any", [tagQuery]),
        orderBy("createdAt", "desc")
      );
      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data,
          id: doc.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [tagQuery, user]);
  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="home__title-text">Search</div>
        </div>
        <div className="home__search-div">
          <input
            type="text"
            className="home__search"
            placeholder="해시태그 검색"
            onChange={onChnage}
          />
        </div>
      </div>
      <div className="post">
        <div className="post__no-posts">
          {posts?.length > 0 ? (
            posts.map((post) => <PostBox key={post.id} post={post} />)
          ) : (
            <div className="posts__text">게시글이 없습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
