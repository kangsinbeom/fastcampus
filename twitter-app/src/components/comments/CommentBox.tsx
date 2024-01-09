import AuthContext from "contexts/AuthContext";
import { useContext } from "react";
import { CommentProps, PostProps } from "utils/type";
import { myRemoveDoc } from "apis/firebase/myUpdateDoc";
import styles from "./Comment.module.scss";

interface CommentBoxProps {
  data: CommentProps;
  post: PostProps;
}
const CommentBox = ({ data, post }: CommentBoxProps) => {
  const { user } = useContext(AuthContext);

  return (
    <div key={data.createdAt} className={styles.comment}>
      <div className={styles.comment__borderBox}>
        <div className={styles.comment__imageBox}>
          <div className={styles.comment__flexBox}>
            <img src="" alt="profile" />
            <div className={styles.comment__email}>{data.email}</div>
            <div className={styles.comment__creatd}>{data.createdAt}</div>
          </div>
          <div className={styles.comment__content}>{data.comment}</div>
        </div>
        <div className={styles.comment__submitDiv}>
          {data.uid === user?.uid && (
            <button
              type="button"
              onClick={() => myRemoveDoc(post, data)}
              className="comment__delete-btn"
            >
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
