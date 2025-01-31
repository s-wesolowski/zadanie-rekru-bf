import startPlaceholderImage from "../assets/start_placeholder.png";
import { BoardItemType } from "../types";
import { useRef } from "react";
import block from "../components/blocks";

const Board = ({
  boardItems,
  setBoardItems,
}: {
  boardItems: BoardItemType[];
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>;
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  if (boardItems.length === 0) {
    return <img src={startPlaceholderImage} alt="" />;
  }

  return (
    <div
      className="relative bg-black50 w-full h-full"
      ref={boardRef}
      id="board"
    >
      {boardItems.map((item) => {
        const BlockComponent = block[item.blockId].Component;

        return (
          <BlockComponent
            key={item.id}
            boardItem={item}
            boardRef={boardRef}
            setBoardItems={setBoardItems}
          />
        );
      })}
    </div>
  );
};

export default Board;
