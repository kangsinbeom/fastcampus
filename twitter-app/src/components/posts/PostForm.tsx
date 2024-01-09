import AuthContext from "contexts/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { useInput } from "hooks/useInput";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { currentDate } from "utils/utilFunc";
import { v4 as uuidv4 } from "uuid";

const PostForm = () => {
  const { form, onChange, setForm } = useInput({ content: "" });
  const [hashTag, setHashTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    setIsSubmitting(true);
    e.preventDefault();
    try {
      let imageUrl = "";
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, "data_url");
        imageUrl = await getDownloadURL(data.ref);
      }

      await addDoc(collection(db, "posts"), {
        content: form.content,
        createdAt: currentDate,
        email: user?.email,
        uid: user?.uid,
        hashTags: tags,
        imageUrl,
      });
      setForm({ content: "" });
      setTags([]);
      setHashTag("");
      setImageFile(null);
      setIsSubmitting(false);
      toast.success("게시글을 생성했습니다.");
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
            value="Tweet"
            className="post-form__submit-btn"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
