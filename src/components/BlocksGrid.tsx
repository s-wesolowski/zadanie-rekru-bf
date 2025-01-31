import { BlockType } from "../types";
import { BoardItemType } from "../types";

const BlocksGrid = ({
  blocks,
  setBoardItems,
}: {
  blocks: BlockType[];
  setBoardItems: React.Dispatch<React.SetStateAction<BoardItemType[]>>;
}) => {
  const handleAddBoardItem = (block: BlockType) => {
    setBoardItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        x: 380 - (block.initialWidth || 200) / 2,
        y: 475 - (block.initialHeight || 200) / 2,
        width: block.initialWidth || 200,
        height: block.initialHeight || 200,
        zIndex: 0,
        blockId: block.id,
      },
    ]);
  };

  return (
    <div className="grid grid-cols-2 gap-x-[29px] gap-y-[32px]">
      {blocks.map((block) => (
        <button
          className="rounded-[10px] bg-white97 h-[256px] flex items-center justify-center relative hover:bg-black25 transition cursor-pointer border-[4px] border-transparent focus:border-primary50"
          key={block.id}
          onClick={() => handleAddBoardItem(block)}
        >
          <img src={block.icon} alt="" />
          <span className="absolute bottom-[12px] mx-auto">{block.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BlocksGrid;
