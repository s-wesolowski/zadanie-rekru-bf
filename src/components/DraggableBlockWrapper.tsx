import { BoardItemType } from "../types";
import MoveIcon from "../assets/move.svg";
import DeleteIcon from "../assets/delete.svg";
import useBlockResize from "../hooks/useBlockResize.ts";
import useBlockDrag from "../hooks/useBlockDrag.ts";
import { useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

const DraggableBlockWrapper = ({
  boardItem,
  boardRef,
  setBoardItems,
  children,
  toolbarComponent,
}: {
  boardItem: BoardItemType;
  boardRef: React.RefObject<HTMLDivElement | null>;
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>;
  children: React.ReactNode;
  toolbarComponent?: React.ReactNode;
}) => {
  const [showToolbox, setShowToolbox] = useState(true);

  const outsideClickRef = useOutsideClick(
    () => setShowToolbox(false),
    showToolbox,
  );

  const { sizes, resizeButtonRef } = useBlockResize(
    boardItem,
    boardRef,
    setBoardItems,
  );

  const { cords, dragButtonRef } = useBlockDrag(
    boardItem,
    boardRef,
    setBoardItems,
  );

  const handleDelete = () => {
    setBoardItems((oldItems) =>
      oldItems.filter((item) => item.id !== boardItem.id),
    );
  };

  return (
    <div
      className="absolute"
      style={{
        top: cords.y,
        left: cords.x,
        width: sizes.width,
        height: sizes.height,
        zIndex: boardItem.zIndex,
      }}
      ref={outsideClickRef}
      onClick={() => !showToolbox && setShowToolbox(true)}
    >
      {showToolbox && (
        <>
          <div className="absolute w-full h-[2px] top-0 left-0 bg-primary" />
          <div className="absolute w-full h-[2px] bottom-0 left-0 bg-primary" />
          <div className="absolute w-[2px] top-0 left-0 h-full bg-primary" />
          <div className="absolute w-[2px] top-0 right-0 h-full bg-primary" />

          <button
            className="bg-white rounded-full absolute top-0 left-0 -translate-1/2 shadow cursor-pointer p-[4px]"
            ref={dragButtonRef}
          >
            <img
              src={MoveIcon}
              alt=""
              className="w-[24px] pointer-events-none"
            />
          </button>

          <button
            className="bg-white rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 shadow cursor-pointer p-[3px]"
            onClick={handleDelete}
          >
            <img src={DeleteIcon} alt="" className="w-[18px]" />
          </button>

          <button
            className="rounded-full absolute bottom-0 right-0 translate-1/2 shadow bg-white w-[18px] h-[18px] p-[3px] cursor-nwse-resize"
            ref={resizeButtonRef}
          >
            <span className="block bg-primary w-full h-full rounded-full" />
          </button>

          <div className="absolute -bottom-[8px] translate-y-full left-0">
            {toolbarComponent}
          </div>
        </>
      )}

      {children}
    </div>
  );
};

export default DraggableBlockWrapper;
