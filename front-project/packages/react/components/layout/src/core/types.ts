import { vars } from "@fastcampus/themes";
import { StyleSprinkles } from "./style.css";

type AsProps = {
  // svg관련된 것만 제외하고 나머지에 대해서 설정을 하는 것임
  as?: Exclude<keyof JSX.IntrinsicElements, keyof SVGElementTagNameMap>;
};
// as에 관한 것 제외하고 나머지를 가져올 것임
type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, "as">;

// 최종적으로 as에서 svg에 대한 것만 빼고 나머지 다 가져오는 것
export type AsElementProps = AsProps & ElementProps;

export type ColorProps = {
  color?: keyof typeof vars.colors.$scale;
  background?: keyof typeof vars.colors.$scale;
};

// parameters로 타입을 뽑아낼 수 있다
export type StyleProps = Parameters<typeof StyleSprinkles>[0] & ColorProps;
