import DraggableBlockWrapper from "../../DraggableBlockWrapper.tsx";
import { BoardItemType } from "../../../types";
import { useState } from "react";

const AVAILABLE_COLORS = [
  "#353535",
  "#FFFFFF",
  "#CF0000",
  "#0055FF",
  "#00DA16",
];

const Component = ({
  boardItem,
  boardRef,
  setBoardItems,
}: {
  boardItem: BoardItemType;
  boardRef: React.RefObject<HTMLDivElement | null>;
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>;
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    AVAILABLE_COLORS[0],
  );

  return (
    <DraggableBlockWrapper
      boardRef={boardRef}
      setBoardItems={setBoardItems}
      boardItem={boardItem}
      toolbarComponent={
        <div className="flex gap-[4px]">
          {AVAILABLE_COLORS.map((color) => (
            <button
              key={color}
              className={`${color === selectedColor ? "border-[2px] border-white" : ""} border-[2px] border-transparent rounded-full w-[24px] h-[24px] p-[2px] cursor-pointer`}
              onClick={() => setSelectedColor(color)}
            >
              <span
                className="block w-full h-full rounded-full"
                style={{
                  backgroundColor: color,
                }}
              />
            </button>
          ))}
        </div>
      }
    >
      <textarea
        className="block h-full w-full text-[32px] text-black100 placeholder:text-black100/25 text-center px-[24px] py-[12px] outline-none"
        placeholder="Type your text here"
        style={{
          color: selectedColor,
        }}
      />
    </DraggableBlockWrapper>
  );
};

export default Component;
