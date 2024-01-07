import { ChangeEvent } from "react";

interface AuthInputProps {
  title: string;
  id: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const AuthInput = ({ title, type, id, onChange, value }: AuthInputProps) => {
  return (
    <div className="form__block">
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default AuthInput;
