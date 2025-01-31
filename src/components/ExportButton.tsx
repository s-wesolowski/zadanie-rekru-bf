import { toPng } from "html-to-image";

const ExportButton = () => {
  const handleExportToPng = () => {
    const board = document.getElementById("board");

    if (!board) return;

    toPng(board, {
      width: 1080,
      height: 1350,
      style: {
        transform: `scale(${1080 / board.offsetWidth})`,
        transformOrigin: "top left",
      },
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `poster_${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    });

    return;
  };

  return (
    <button
      className="px-[32px] py-[8px] text-button bg-primary rounded-[5px] text-white font-semibold w-fit leading-6 ml-auto mt-auto cursor-pointer hover:bg-primary-hover transition"
      onClick={handleExportToPng}
    >
      Export to PNG
    </button>
  );
};

export default ExportButton;
