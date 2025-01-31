import BackgroundComponent from "./BackgroundComponent.tsx";
import BackgroundIcon from "../../../assets/background.svg";
import { BlockType } from "../../../types";

const background: BlockType = {
  id: "background",
  label: "Background",
  category: "content",
  icon: BackgroundIcon,
  Component: BackgroundComponent,
};

export default background;
