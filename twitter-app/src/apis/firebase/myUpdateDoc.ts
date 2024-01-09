import { User } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { toast } from "react-toastify";
import { PostProps } from "utils/type";

export const myUnionDoc = async <T>(post: PostProps, data: T) => {
  try {
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, {
      comments: arrayUnion(data),
    });
    toast.success("성공적으로 댓글을 생성했습니다");
  } catch (error) {
    console.error(error);
  }
};

export const myRemoveDoc = async <T>(post: PostProps, data: T) => {
  try {
    const postRef = doc(db, "posts", post.id);
    await updateDoc(postRef, {
      comments: arrayRemove(data),
    });
    toast.success("댓글을 삭제했습니다.");
  } catch (error) {
    console.error(error);
  }
};

export const myRemoveImage = async (post: PostProps) => {
  const imageRef = ref(storage, post.imageUrl);
  if (post.imageUrl) {
    deleteObject(imageRef).catch((error) => {
      console.log(error);
    });
  }

  await deleteDoc(doc(db, "posts", post.id));
  toast.success("게시글을 삭제했습니다");
};

export const toggleLike = async (post: PostProps, user: User) => {
  const postRef = doc(db, "posts", post.id);
  if (user?.uid && post.likes?.includes(user.uid)) {
    await updateDoc(postRef, {
      likes: arrayRemove(user.uid),
      likeCount: post.likeCount ? post.likeCount - 1 : 0,
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(user?.uid),
      likeCount: post.likeCount ? post.likeCount + 1 : 1,
    });
  }
};

export const RemoveImageAtStorage = (post: PostProps) => {
  const imageRef = ref(storage, post.imageUrl);
  if (post.imageUrl) {
    deleteObject(imageRef).catch((error) => {
      console.log(error);
    });
  }
};
