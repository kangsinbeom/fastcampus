import { Link } from "react-router-dom";
import * as s from "./styles";
interface PostItemProps {
  index: number;
}

const PostItem = ({ index }: PostItemProps) => {
  return (
    <s.PostItem>
      <Link to={`/posts/${index}`}>
        <s.ProfileBox>
          <div className="profile">prifle</div>
          <div className="author">writer</div>
          <div className="date">date</div>
        </s.ProfileBox>
        <div className="title">title</div>
        <div className="content">content</div>
        <div>
          <div className="delete">삭제</div>
          <div className="edit">수정</div>
        </div>
      </Link>
    </s.PostItem>
  );
};

export default PostItem;
