import { FormEvent } from "react";
import AuthInput from "./AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "hooks/useInput";
import { app } from "firebaseApp";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth/cordova";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [form, onChange] = useInput(initialState);
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
      toast.success("성공적으로 로그인 되었습니다");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };
  const onClickSocialLogin = async (e: any) => {
    const { name } = e.target;

    let provider;
    const auth = getAuth(app);
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth,
      provider as GithubAuthProvider | GoogleAuthProvider
    )
      .then((result) => {
        console.log(result);
        toast.success("로그인 되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error?.message;
        toast?.error(errorMessage);
      });
  };
  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form__title">로그인</div>
      <AuthInput
        id="email"
        title="이메일"
        type="text"
        onChange={onChange}
        value={form.email}
      />
      <AuthInput
        id="password"
        title="비밀번호"
        type="password"
        onChange={onChange}
        value={form.password}
      />
      <div className="form__block">
        <div className="form__error">{"error"}</div>
      </div>
      <div className="form__block">
        계정이 없으신가요?
        <Link to={"/users/signup"} className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn--submit" disabled={false}>
          로그인
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          name="google"
          className="form__btn--google"
          onClick={(e) => onClickSocialLogin(e)}
        >
          Google로 로그인
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          name="github"
          className="form__btn--github"
          onClick={(e) => onClickSocialLogin(e)}
        >
          Github로 로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
