import { Link } from "react-router-dom";
import Input from "../input";
import * as s from "./styles";

const LoginForm = () => {
  return (
    <s.LoginForm>
      <Input label="email" title="이메일" type="text" />
      <Input label="password" title="비밀번호" type="password" />
      <s.LinkBox>
        계정이 없으신가요? <Link to="/signup">회원가입하기</Link>
      </s.LinkBox>
      <button>로그인</button>
    </s.LoginForm>
  );
};

export default LoginForm;
