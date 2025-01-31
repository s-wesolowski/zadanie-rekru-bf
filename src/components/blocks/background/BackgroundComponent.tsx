import { useEffect, useRef, useState } from "react";
import { BoardItemType } from "../../../types";

const Component = ({
  setBoardItems,
  boardItem,
}: {
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>;
  boardItem: BoardItemType;
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
      setBoardItems((boardItems) =>
        boardItems.filter(
          (item) => item.blockId !== "background" || item.id === boardItem.id,
        ),
      );

      setFile(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  return file ? (
    <div className="overflow-hidden w-full h-full">
      <img
        src={file}
        alt=""
        className="w-full h-full object-center object-cover"
      />
    </div>
  ) : (
    <input
      type="file"
      accept="image/*"
      ref={inputRef}
      hidden
      onChange={handleUploadImage}
    />
  );
};

export default Component;
