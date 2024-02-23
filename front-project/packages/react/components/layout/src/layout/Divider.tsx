import * as React from "react";
import { vars } from "@fastcampus/themes";
import { DividerProps } from "./types";

const Divider = (props: DividerProps, ref: React.Ref<HTMLHRElement>) => {
  const {
    color = "gray",
    variant = "solid",
    size = 1,
    orientation = "horizontal",
  } = props;

  const borderStyle =
    orientation === "horizontal"
      ? {
          width: "100%",
          borderWidth: `0 0 ${size}px 0`,
        }
      : {
          height: "100%",
          borderWidth: `0 0 0 ${size}px`,
        };

  return (
    <hr
      {...props}
      ref={ref}
      style={{
        borderStyle: variant,
        borderColor: color && vars.colors.$scale?.[color]?.[200],
        ...borderStyle,
        ...props.style,
        // 오버레이가 될 수 있게 가장 마지막에 넣는 요소임
      }}
    />
  );
};

const _Divider = React.forwardRef(Divider);
export { _Divider as Divider };
