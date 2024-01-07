import { Link, useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import { useInput } from "hooks/useInput";
import { FormEvent } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

const SignupForm = () => {
  const [form, onChange] = useInput(initialState);
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
      toast.success("성공적으로 회원가입이 되었습니다");
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
      <div className="form__title">회원가입</div>
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
      <AuthInput
        id="passwordConfirmation"
        title="비밀번호 확인"
        type="password"
        onChange={onChange}
        value={form.passwordConfirmation}
      />
      <div className="form__block">
        <div className="form__error">{"error"}</div>
      </div>
      <div className="form__block">
        계정이 있으신가요?
        <Link to={"/users/login"} className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block--lg">
        <button type="submit" className="form__btn--submit" disabled={false}>
          회원가입
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          name="google"
          className="form__btn--google"
          onClick={(e) => onClickSocialLogin(e)}
        >
          Google로 회원가입
        </button>
      </div>
      <div className="form__block">
        <button
          type="button"
          name="github"
          className="form__btn--github"
          onClick={(e) => onClickSocialLogin(e)}
        >
          Github로 회원가입
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
