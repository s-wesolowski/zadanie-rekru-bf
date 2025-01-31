import Logo from "./assets/logo.svg";
import blocks from "./components/blocks";
import Board from "./components/Board";
import ExportButton from "./components/ExportButton";
import ResetButton from "./components/ResetButton";
import BlocksGrid from "./components/BlocksGrid";
import { BoardItemType } from "./types";
import { useState } from "react";

function App() {
  const [boardItems, setBoardItems] = useState<BoardItemType[]>([]);

  return (
    <main className="flex mx-auto w-fit gap-[24px] p-[66px] text-body">
      <section className="w-[759px] h-[948px]">
        <Board boardItems={boardItems} setBoardItems={setBoardItems} />
      </section>

      <section className="w-[759px] flex flex-col gap-[32px]">
        <div className="flex items-center gap-[20px]">
          <img src={Logo} alt="logo" />
          <h1 className="text-display text-black75">Canvas Editor</h1>

          <ResetButton setBoardItems={setBoardItems} />
        </div>

        <div />
        <div className="font-bold bg-white97 rounded-[10px] px-[16px] py-[24px]">
          Add content
        </div>

        <BlocksGrid
          blocks={[blocks.background, blocks.text, blocks.image]}
          setBoardItems={setBoardItems}
        />
        <div />
        <ExportButton />
      </section>
    </main>
  );
}

export default App;
