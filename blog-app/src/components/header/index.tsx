import { Link } from "react-router-dom";
import * as s from "./styles";

const Header = () => {
  return (
    <s.Header>
      <Link to="/posts/new">글쓰기</Link>
      <Link to="/posts">게시글</Link>
      <Link to="/profile">프로필</Link>
    </s.Header>
  );
};

export default Header;
