import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PostProps } from "utils/type";
import { useContext } from "react";
import AuthContext from "contexts/AuthContext";
import { myRemoveImage, toggleLike } from "apis/firebase/myUpdateDoc";
import { User } from "firebase/auth";

const PostBox = ({ post }: { post: PostProps }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleDelete = () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm) myRemoveImage(post).then(() => navigate("/"));
  };
  return (
    <div className="post__box" key={post.id}>
      <Link to={`/posts/${post.id}`}>
        <div className="post__box-profile">
          <div className="post__flex">
            {post.profileUrl ? (
              <img
                src={post.profileUrl}
                alt="profile"
                className="post__box-profile-img"
              />
            ) : (
              <FaUserCircle className="post__box-profile-icon" />
            )}
            <div className="post__email">{post.email}</div>
            <div className="post__createdAt">{post.createdAt}</div>
          </div>
          <div className="post__box-content">{post.content}</div>
          {post.imageUrl && (
            <div className="post__image-div">
              <img
                src={post.imageUrl}
                alt="post img"
                className="post__image"
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="post-form__hashtags-outputs">
            {post.hashTags?.map((tag, index) => (
              <span className="post-form__hashtags-tag" key={index}>
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="post__box-footer">
        {user?.uid === post.uid && (
          <>
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post.id}`}>Edit</Link>
            </button>
          </>
        )}

        <button
          type="button"
          className="post__likes"
          onClick={() => toggleLike(post, user as User)}
        >
          {user && post.likes?.includes(user?.uid) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
          {post.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post.comments?.length || 0}
        </button>
      </div>
    </div>
  );
};

export default PostBox;
