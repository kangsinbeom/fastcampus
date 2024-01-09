import PostHeader from "components/posts/PostHeader";
import AuthContext from "contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "firebaseApp";
import { useInput } from "hooks/useInput";
import React, { useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const ProfileEdit = () => {
  const { form, onChange, setForm } = useInput({ displayName: "" });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const STORAGE_DOWNLOAD_URL_STR = "https://firebasestorage.googleapis.com";
  const handleFileUpload = (e: any) => {
    // const {
    //   target: { files },
    // } = e;
    const { files } = e.target;
    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e: any) => {
      const { result } = e.currentTarget;
      setImageUrl(result);
    };
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    let newImage = null;
    try {
      if (user?.photoURL && user.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR)) {
        const imageRef = ref(storage, user.photoURL);
        await deleteObject(imageRef).catch((error) => console.error(error));
      }
      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, "data_url");
        newImage = await getDownloadURL(data.ref);
      }
      if (user) {
        await updateProfile(user, {
          displayName: form.displayName || "",
          photoURL: imageUrl || "",
        })
          .then(() => {
            toast.success("프로필이 없데이트 되었습니다.");
            navigate("/profile");
          })
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL);
    }
    setForm((prev) => ({ ...prev, dispalyName: user?.displayName }));
  }, [user?.photoURL]);

  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onsubmit}>
        <div className="post-form__profile">
          <input
            type="text"
            name="displayName"
            className="post-form__input"
            placeholder="이름"
            onChange={onChange}
            value={form.displayName}
          />
          {imageUrl && (
            <div className="post-form__attachment">
              <img src={imageUrl} alt="attachment" />
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="post-form__clear-btn"
              >
                삭제
              </button>
            </div>
          )}
          <div className="post-form__submit-area">
            <div className="post-form__image-area">
              <label htmlFor="file-input" className="post-form__file">
                <FiImage className="post-form__file-icon" />
              </label>
              <input
                type="file"
                name="file-input"
                id="file-input"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <input
                type="submit"
                value="프로필 수정"
                className="post-form__submit-btn"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
