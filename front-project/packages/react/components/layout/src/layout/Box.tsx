import * as React from "react";
import { BoxProps } from "./types";
import { clsx } from "clsx";
import { BaseStyle, StyleSprinkles } from "../core/style.css";
import { extractSprinkleProps } from "../utils/properties";
import { vars } from "@fastcampus/themes";

const Box = (props: BoxProps, ref: React.Ref<HTMLElement>) => {
  const { as = "div", color, background, children } = props;
  // 원하는 속성을 받을 수 있게 createElement를 사용하고 그냥 div만들어서 사용하지 않음
  return React.createElement(
    as,
    {
      ref,
      // style.css.ts에서 추가한 내용 사용하는 방법
      className: clsx([
        BaseStyle,
        StyleSprinkles(
          extractSprinkleProps(props, Array.from(StyleSprinkles.properties)),
        ),
        props.className,
      ]),
      style: {
        color: color && vars.colors.$scale?.[color]?.[700],
        background: background && vars.colors.$scale?.[background]?.[100],
        ...props.style,
      },
      ...props,
    },
    children,
  );
};
const _Box = React.forwardRef(Box);
export { _Box as Box };
