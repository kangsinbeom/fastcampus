import * as s from "./styles";
const PostDetail = () => {
  return (
    <s.PostDetail>
      <s.PostBox>
        <div className="title">title</div>
        <s.ProfileBox>
          <div className="profle">profle</div>
          <div className="author">author</div>
          <div className="date"></div>
        </s.ProfileBox>
        <div className="content"></div>
      </s.PostBox>
    </s.PostDetail>
  );
};

export default PostDetail;
