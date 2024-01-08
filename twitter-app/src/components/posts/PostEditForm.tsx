import AuthContext from "contexts/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useInput } from "hooks/useInput";
import { useCallback, useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "utils/type";
import { currentDate } from "utils/utilFunc";

const PostEditForm = () => {
  const params = useParams();
  const { form, onChange, setForm } = useInput({ content: "" });
  const [post, setPost] = useState<PostProps | null>(null);
  const [hashTag, setHashTag] = useState<string>("");
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
    }
  }, [params.id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          content: form.content,
          hashTags: tags,
        });
        navigate(`/posts/${post.id}`);
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

  const handleFileUpload = () => {};

  useEffect(() => {
    if (params.id) getPost();
  }, [params.id, getPost]);
  return (
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
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file" />
          </label>
          <input
            type="file"
            accept="image/*"
            id="file-input"
            className="hidden"
            onChange={handleFileUpload}
          />
          <input type="submit" value="수정" className="post-form__submit-btn" />
        </div>
      </form>
    </div>
  );
};

export default PostEditForm;
