import { myUnionDoc } from "apis/firebase/myUpdateDoc";
import AuthContext from "contexts/AuthContext";
import { useInput } from "hooks/useInput";
import { useContext } from "react";
import { CommentFormProps } from "utils/type";
import { currentDate } from "utils/utilFunc";

const CommentForm = ({ post }: CommentFormProps) => {
  const { user } = useContext(AuthContext);
  const {
    form: { comment },
    onChange,
    setForm,
  } = useInput({ comment: "" });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentObj = {
      comment,
      uid: user?.uid,
      email: user?.email,
      createdAt: currentDate,
    };

    if (post && user)
      myUnionDoc(post, user, commentObj).then(() =>
        setForm((prev) => ({ ...prev, comment: "" }))
      );
  };
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        name="comment"
        id="comment"
        placeholder="what is happening"
        value={comment}
        onChange={onChange}
        required
        className="post-form__textarea"
      />
      <div className="post-form__submit-area">
        <div />
        <input
          type="submit"
          value="comment"
          className="post-form__submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
};

export default CommentForm;
