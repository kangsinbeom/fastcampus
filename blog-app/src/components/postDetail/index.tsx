import { useNavigate, useParams } from "react-router-dom";
import * as s from "./styles";
import { useEffect, useState } from "react";
import { PostProps } from "components/postList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };
  const handleDelete = async () => {
    const confirm = window.confirm("게시글 삭제 ㄱㄱ?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      navigate("/");
    }
  };
  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, []);
  return (
    <s.PostDetail>
      <s.PostBox>
        <div className="title">title</div>
        <s.ProfileBox>
          <div className="profle">profle</div>
          <div className="author">author</div>
          <div className="date"></div>
        </s.ProfileBox>
        <div className="content"></div>
      </s.PostBox>
    </s.PostDetail>
  );
};

export default PostDetail;
