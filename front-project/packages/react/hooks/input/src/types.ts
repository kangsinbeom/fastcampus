import { ComponentPropsWithoutRef } from "react";

export type UseInputProps = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
} & Omit<ComponentPropsWithoutRef<"input">, "disabled" | "readOnly">;
/**
 * 여기에 value 와 onChange를 넣게 되면 비제어 컴포넌트에서 다룰 수 없기에 넣지 않음
 * 동일한 사항으로 ref도 넣지 않음
 * 확장성을 고려해서 input에 있는 모든 속성의 컴포넌트를 받아올 것임
 * 처음에 ComponentPropsWithoutRef 없다고 나오는데 yarn하고 하면 잘 됨
 */

export type UseInputResult = {
  inputProps: ComponentPropsWithoutRef<"input"> & {
    "data-disabled": boolean;
    "data-invalid": boolean;
    "aria-invalid": boolean;
    "aria-required": boolean;
    // 이거 왜 추가하는건데 시부레!!
  };
  valueCount: number;
};
