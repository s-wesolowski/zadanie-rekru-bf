import ImageComponent from "./ImageComponent.tsx";
import ImageIcon from "../../../assets/image.svg";
import { BlockType } from "../../../types";

const image: BlockType = {
  id: "image",
  label: "Image",
  category: "content",
  icon: ImageIcon,
  Component: ImageComponent,
  initialWidth: 200,
  initialHeight: 200,
};

export default image;
