import * as s from "./styles";

interface InputProps {
  label: string;
  title: string;
  type: string;
}

const Input = ({ label, title, type }: InputProps) => {
  return (
    <div className="form_block">
      <label htmlFor={label}>{title}</label>
      <input type={type} name={label} id={label} required />
    </div>
  );
};

export default Input;
