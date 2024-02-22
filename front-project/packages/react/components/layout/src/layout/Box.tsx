import * as React from "react";
import { BoxProps } from "./types";

const Box = (props: BoxProps, ref: React.Ref<HTMLElement>) => {
  const { as = "div", children } = props;
  return React.createElement(
    as,
    {
      ref,
      className: props.className,
      style: {
        background: "yellow",
        width: "100px",
        height: "100px",
      },
      ...props,
    },
    children,
  );
};
const _Box = React.forwardRef(Box);
export { _Box as Box };
