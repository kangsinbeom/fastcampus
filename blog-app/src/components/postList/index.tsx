import PostItem from "components/postItem";
import * as s from "./styles";
const PostList = () => {
  return (
    <s.PostList>
      {[...Array(10)].map((e, index) => (
        <PostItem key={index} index={index} />
      ))}
    </s.PostList>
  );
};

export default PostList;
