import { ReactElement } from "react";

export type BoardItemType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  blockId: string;
};

export type BlockType = {
  id: string;
  label: string;
  category: string;
  icon: string;
  initialWidth?: number;
  initialHeight?: number;
  beforeAdd?: (
    setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>,
  ) => void;
  Component: ({
    boardItem,
    boardRef,
    setBoardItems,
  }: {
    boardItem: BoardItemType;
    boardRef: React.RefObject<HTMLDivElement | null>;
    setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>;
    boardItems?: BoardItemType[];
  }) => ReactElement;
};
