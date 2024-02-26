import { useState } from "react";
import { UseInputProps, UseInputResult } from "./types";

export const useInput = (props: UseInputProps): UseInputResult => {
  const {
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
    isRequired = false,
    defaultValue,
    value,
    onChange,
    ...rest
  } = props;
  // 제어, 비제어 둘 중 어느 것인지 구분하자
  const isCountrolled = value !== undefined && onChange !== undefined;
  // 제어 시
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? "",
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCountrolled) {
      onChange(event);
    } else {
      // 비제어 시
      setUncontrolledValue(event.target.value);
    }
  };

  const currentValue = isCountrolled ? value : uncontrolledValue;

  return {
    inputProps: {
      ...rest,
      defaultValue,
      value: currentValue,
      onChange: handleChange,
      disabled: isDisabled,
      readOnly: isReadOnly,
      "data-disabled": isDisabled,
      "data-invalid": isInvalid,
      "aria-invalid": isInvalid,
      "aria-required": isRequired,
    },
    valueCount: currentValue.toString().length,
  };
};
/**새로운 요구사항으로 카운트를 해주고 싶다고 했을 때 여기다 기능을 추가할텐데
 * 위 valueCount와 같이 이럴 때 제어 비제이를 어떻게 사용할 수 있을까 싶은데
 * 두개의 상황으로 구현을 해볼 것임
 * controlled는 value와 onChange를 받아오니 간단하다
 */
