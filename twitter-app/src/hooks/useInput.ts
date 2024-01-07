import { useState } from "react";

export const useInput = <T>(initalState: T) => {
  const [form, setForm] = useState<T>(initalState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };

  return [form, onChange] as const;
};
