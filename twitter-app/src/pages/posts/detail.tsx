import Loader from "components/loader";
import PostBox from "components/posts/PostBox";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "firebaseApp";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentProps, PostProps } from "utils/type";
import PostHeader from "components/posts/PostHeader";
import CommentForm from "components/comments/CommentForm";
import CommentBox from "components/comments/CommentBox";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      onSnapshot(docRef, (doc) => {
        setPost({ ...(docSnap.data() as PostProps), id: doc.id });
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [params.id, getPost]);

  return (
    <div className="post">
      <PostHeader />
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
          {post.comments
            ?.slice(0)
            .reverse()
            .map((data: CommentProps, index: number) => (
              <CommentBox data={data} key={index} post={post} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PostDetail;
