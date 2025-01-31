import { useEffect, useRef, useState } from "react";
import { BoardItemType } from "../types";

const useBlockResize = (
  boardItem: BoardItemType,
  boardRef: React.RefObject<HTMLDivElement | null>,
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>,
) => {
  const [isResizing, setIsResizing] = useState(false);

  const [sizes, setSizes] = useState({
    width: boardItem.width,
    height: boardItem.height,
  });

  const resizeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!resizeButtonRef.current) return;

    resizeButtonRef.current.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      setIsResizing(true);
    });
  });

  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!boardRef || !boardRef?.current) return;

      const boardRect = boardRef.current.getBoundingClientRect();

      if (!boardRect) return;

      let width = e.clientX - boardItem.x - boardRect.left;
      let height = e.clientY - boardItem.y - boardRect.top;

      if (width < 50) {
        width = 50;
      }

      if (height < 50) {
        height = 50;
      }

      const isOutsideX =
        e.clientX < 0 || e.clientX > boardRect.x + boardRect.width;

      const isOutsideY =
        e.clientY < 0 || e.clientY > boardRect.y + boardRect.height;

      setSizes((oldSize) => ({
        width: isOutsideX ? oldSize.width : width,
        height: isOutsideY ? oldSize.height : height,
      }));
    };

    const handleResizeEnd = () => {
      setBoardItems((oldItems) =>
        oldItems.map((item) =>
          item.id === boardItem.id
            ? { ...item, width: sizes.width, height: sizes.height }
            : item,
        ),
      );

      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", handleResizeEnd);
      document.addEventListener("mouseleave", handleResizeEnd);
    } else {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
      document.removeEventListener("mouseleave", handleResizeEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
      document.removeEventListener("mouseleave", handleResizeEnd);
    };
  }, [
    boardItem,
    isResizing,
    boardRef,
    setBoardItems,
    sizes.width,
    sizes.height,
  ]);

  return { sizes, resizeButtonRef };
};

export default useBlockResize;
