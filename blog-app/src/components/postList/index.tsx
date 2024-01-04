import PostItem from "components/postItem";
import * as s from "./styles";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface PostProps {
  id?: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  uid?: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery = query(postsRef, orderBy("createdAt", "asc"));

    // 나의 글의 query
    // posetsQuery = query(postsRef, where('uid', '==', user.uid), orderBy...)

    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("게시글 삭제 ㄱㄱ?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <s.PostList>
      {posts.length > 0
        ? posts.map((e, index) => <PostItem key={e.id} index={index} />)
        : "게시글이 없습니다"}
    </s.PostList>
  );
};

export default PostList;
