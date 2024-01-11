import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

interface IconProps {
  iconName: IconNameProps;
}

type IconNameProps = "BiMenu" | "AiOutlineClose";

const Icon = ({ iconName }: IconProps) => {
  switch (iconName) {
    case "BiMenu":
      return <BiMenu />;
    case "AiOutlineClose":
      return <AiOutlineClose />;
  }
};

export default Icon;
