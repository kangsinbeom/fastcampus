import { Link, useNavigate } from "react-router-dom";
import Input from "../input";
import * as s from "./styles";
import { app } from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
