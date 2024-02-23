import * as React from "react";
import { TextProps } from "./types";
import { BaseStyle, StyleSprinkles } from "../core/style.css";
import { extractSprinkleProps } from "../utils/properties";
import { vars } from "@fastcampus/themes";
import { clsx } from "clsx";
import { textStyle } from "./style.css";

const Text = (props: TextProps, ref: React.Ref<HTMLElement>) => {
  const { as = "p", children, color = "gray", background, fontSize } = props;
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
        textStyle({
          fontSize,
        }),
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

const _Text = React.forwardRef(Text);
export { _Text as Text };

export default Text;
