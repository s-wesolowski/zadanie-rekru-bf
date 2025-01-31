import Reset from "../assets/reset.svg";
import { useState } from "react";
import Modal from "./Modal.tsx";
import AlertIcon from "../assets/alert.svg";

const ResetButton = ({
  setBoardItems,
}: {
  setBoardItems: (items: []) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="ml-auto text-red flex flex-col cursor-pointer"
        onClick={handleOpenModal}
      >
        <span className="flex gap-2 font-medium">
          Reset
          <img src={Reset} alt="reset" className="w-[24px]" />
        </span>
        <span className="h-px w-full bg-red" />
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center px-[128px]">
          <img src={AlertIcon} alt="" className="py-[45px]" />

          <h2 className="text-display text-black100 font-bold">WARNING</h2>

          <p className="text-center mt-[8px]">
            You're about to reset whole process.
            <br />
            Are you sure you want to do it?
          </p>

          <div>
            <button
              className="text-black100 bg-gray mt-4 ml-4 py-2 rounded-md cursor-pointer text-button text-[18px]"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="px-[32px] py-[8px] text-button bg-primary rounded-[5px] text-white font-semibold w-fit leading-6 cursor-pointer hover:bg-primary-hover transition mt-[48px] ml-[32px]"
              onClick={() => {
                setBoardItems([]);
                handleCloseModal();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResetButton;
