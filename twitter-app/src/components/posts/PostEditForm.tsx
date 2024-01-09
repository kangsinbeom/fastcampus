import AuthContext from "contexts/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { db, storage } from "firebaseApp";
import { useInput } from "hooks/useInput";
import { useCallback, useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "utils/type";
import { v4 as uuidv4 } from "uuid";
import PostHeader from "./PostHeader";
import { RemoveImageAtStorage } from "apis/firebase/myUpdateDoc";

const PostEditForm = () => {
  const params = useParams();
  const { form, onChange, setForm } = useInput({ content: "" });
  const [post, setPost] = useState<PostProps | null>(null);
  const [hashTag, setHashTag] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [tags, setTags] = useState<string[]>([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap.data() as PostProps), id: docSnap.id });
      setForm({ content: docSnap.data()?.content });
      setTags(docSnap.data()?.hashTags);
      setImageFile(docSnap.data()?.imageUrl);
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    try {
      if (post) {
        RemoveImageAtStorage(post);
        let imageUrl = "";

        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, "data_url");
          imageUrl = await getDownloadURL(data.ref);
        }
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          content: form.content,
          hashTags: tags,
          imageUrl,
        });
        navigate(`/posts/${post.id}`);
        setIsSubmitting(false);
        setImageFile(null);
        toast.success("게시글을 수정하였습니다.");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const hanldeKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      if (tags.includes(e.target.value.trim())) {
        toast.error("같은 태그가 존재합니다");
      } else {
        setTags((prev) => (prev.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader?.readAsDataURL(file as File);

    fileReader.onloadend = (e: any) => {
      const { result } = e.currentTarget;
      setImageFile(result);
    };
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [params.id, getPost]);
  return (
    <div className="post">
      <PostHeader />
      <div>
        <form className="post-form" onSubmit={onSubmit}>
          <textarea
            className="post-form__textarea"
            name="content"
            id="content"
            placeholder="What is happening"
            value={form.content}
            onChange={onChange}
            required
          />
          <div className="post-form__hashtags">
            <span className="post-form__hastags-outputs">
              {tags?.map((tag, index) => (
                <span
                  className="post-form__hashtags-tag"
                  key={index}
                  onClick={() => setTags(tags.filter((val) => val !== tag))}
                >
                  #{tag}
                </span>
              ))}
            </span>
            <input
              className="post-form__input"
              id="hashtag"
              name="hashtag"
              placeholder="해시태그 + 스페이스바 입력"
              onChange={(e) => setHashTag(e.target.value.trim())}
              onKeyUp={hanldeKeyUp}
              value={hashTag}
            />
          </div>
          <div className="post-form__submit-area">
            <div className="post-form__image-area">
              <label htmlFor="file-input" className="post-form__file">
                <FiImage className="post-form__file" />
              </label>
              <input
                type="file"
                accept="image/*"
                name="file-input"
                id="file-input"
                className="hidden"
                onChange={handleFileUpload}
              />
              {imageFile && (
                <div className="post-form__attachment">
                  <img
                    src={imageFile}
                    alt="attachment"
                    width={100}
                    height={100}
                  />
                  <button
                    className="post-form__clear-btn"
                    onClick={() => setImageFile(null)}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            <input
              type="submit"
              value="수정"
              className="post-form__submit-btn"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditForm;
