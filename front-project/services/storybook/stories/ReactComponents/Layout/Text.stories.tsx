import "@fastcampus/react-components-layout/style.css";
import { Text as _Text } from "@fastcampus/react-components-layout";
import { classes, vars } from "@fastcampus/themes";
export default {
  title: "React Components/Layout/Typography/Text",
  component: _Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // 이부분이 왜 안되지?
  argTypes: {
    fontSize: {
      options: Object.keys(classes.typography.text),
      control: "select",
    },
    color: {
      options: Object.keys(vars.colors.$scale),
      control: "select",
    },
  },
};
export const TextStory = {
  args: {
    as: "p",
    fontSize: "sm",
    children: "helloworld",
  },
};
