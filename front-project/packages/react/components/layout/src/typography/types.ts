import { classes } from "@fastcampus/themes";
import { AsElemetProps, StyleProps } from "../core/types";
import { CSSProperties } from "@vanilla-extract/css";

export type TextProps = AsElemetProps &
  StyleProps & {
    fontSize: keyof typeof classes.typography.text;
    align?: CSSProperties["textAlign"];
    casing?: CSSProperties["textTransform"];
    decoration?: CSSProperties["textDecoration"];
  };

export type HeadingProps = AsElemetProps &
  StyleProps & {
    fontSize: keyof typeof classes.typography.heading;
  };
