import { useEffect, useRef } from "react";
import "./style.scss";

function ModalPopUp({ name, modalState, toogleState, handelClickConfirm }) {
  const modalContainerRef = useRef();
  const handleConfirm = () => {
    handelClickConfirm();
    toogleState(false);
  };
  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target) &&
        modalState !== undefined
      )
        toogleState(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  });

  return (
    <div
      className={`remove-modal${modalState === undefined ? "" : " opened"}${
        modalState === false ? " out" : ""
      }`}
    >
      <div className='modal-background'>
        <div className='modal-container' ref={modalContainerRef}>
          <div className='modal__content'>Xóa sản phẩm khỏi {name}?</div>
          <div className='modal__footer'>
            <button
              className='modal__button--confirm confirm-btn'
              onClick={() => handleConfirm()}
            >
              Xoá
            </button>
            <button
              className='modal__button--cancel cancel-btn'
              onClick={() => toogleState(false)}
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPopUp;
