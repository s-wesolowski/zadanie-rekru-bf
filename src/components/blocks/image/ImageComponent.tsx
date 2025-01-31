import DraggableBlockWrapper from "../../DraggableBlockWrapper";
import { BoardItemType } from "../../../types";
import { useEffect, useRef, useState } from "react";
import ImagePlaceholder from "../../../assets/image_placeholder.png";

const Component = ({
  boardItem,
  boardRef,
  setBoardItems,
}: {
  boardItem: BoardItemType;
  boardRef: React.RefObject<HTMLDivElement | null>;
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    if (!mounted) {
      setMounted(true);
      return;
    }

    inputRef.current?.click();
  }, [mounted, inputRef]);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setFile(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <DraggableBlockWrapper
      setBoardItems={setBoardItems}
      boardItem={boardItem}
      boardRef={boardRef}
    >
      <div className="overflow-hidden w-full h-full">
        <img
          src={file || ImagePlaceholder}
          alt=""
          className="w-full h-full object-center object-contain"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
        onChange={handleUploadImage}
      />
    </DraggableBlockWrapper>
  );
};

export default Component;
