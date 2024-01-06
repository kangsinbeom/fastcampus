import { FiImage } from "react-icons/fi";

const PostForm = () => {
  const handleFileUpload = () => {};
  return (
    <div>
      <form className="post-form">
        <textarea
          className="post-form__textarea"
          name="content"
          id="content"
          placeholder="What is happening"
          required
        />
        <div className="post-form__submit-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file" />
          </label>
          <input
            type="file"
            accept="image/*"
            name="file-input"
            className="hidden"
            onChange={handleFileUpload}
          />
          <input
            type="submit"
            value="Tweet"
            className="post-form__submit-btn"
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
