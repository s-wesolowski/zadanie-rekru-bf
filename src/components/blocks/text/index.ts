import TextComponent from "./TextComponent.tsx";
import TextIcon from "../../../assets/text.svg";
import { BlockType } from "../../../types";

const text: BlockType = {
  id: "text",
  label: "Text",
  category: "content",
  icon: TextIcon,
  Component: TextComponent,
  initialHeight: 120,
  initialWidth: 350,
};

export default text;
