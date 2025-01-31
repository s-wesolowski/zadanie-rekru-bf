import { createPortal } from "react-dom";
import CloseIcon from "../assets/close.svg";
import { useOutsideClick } from "../hooks/useOutsideClick.ts";

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const outsideClickRef = useOutsideClick(onClose, isOpen);

  return createPortal(
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-10 p-[24px] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="bg-white p-4 rounded-lg pt-[32px] pl-[32px] pr-[32px] pb-[48px] relative"
        ref={outsideClickRef}
      >
        <button
          onClick={onClose}
          className="absolute right-0 top-0 m-[32px] cursor-pointer p-[4px]"
        >
          <img src={CloseIcon} alt="" className="w-[24px] h-[24px]" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("root")!,
  );
};

export default Modal;
