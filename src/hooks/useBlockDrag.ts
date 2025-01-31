import { useEffect, useRef, useState } from "react";
import { BoardItemType } from "../types";

const useBlockDrag = (
  boardItem: BoardItemType,
  boardRef: React.RefObject<HTMLDivElement | null>,
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>,
) => {
  const [cords, setCords] = useState({ x: boardItem.x, y: boardItem.y });

  const [isDragging, setIsDragging] = useState(false);

  const dragButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!dragButtonRef.current) return;

    dragButtonRef.current.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      setIsDragging(true);
    });
  });

  useEffect(() => {
    const handleDrag = (e: MouseEvent) => {
      if (!boardRef || !boardRef?.current) return;

      const boardRect = boardRef.current.getBoundingClientRect();

      if (!boardRect) return;

      const x = e.clientX - boardRect.left;

      const y = e.clientY - boardRect.top;

      const isOutsideX =
        x < 0 || x > boardRect.width || boardItem.width + x > boardRect.width;

      const isOutsideY =
        y < 0 ||
        y > boardRect.height ||
        boardItem.height + y > boardRect.height;

      setCords((oldCords) => ({
        x: isOutsideX ? oldCords.x : x,
        y: isOutsideY ? oldCords.y : y,
      }));
    };

    const handleDragEnd = () => {
      setBoardItems((oldItems) =>
        oldItems.map((item) =>
          item.id === boardItem.id ? { ...item, x: cords.x, y: cords.y } : item,
        ),
      );
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("mouseleave", handleDragEnd);
    } else {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("mouseleave", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("mouseleave", handleDragEnd);
    };
  }, [boardItem, isDragging, boardRef, setBoardItems, cords.x, cords.y]);

  return { cords, dragButtonRef };
};

export default useBlockDrag;
