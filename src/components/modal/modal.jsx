import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.scss";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

Modal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function Modal({
  modalOpen,
  setModalOpen,
  modalClose,
  header = null,
  children,
}) {
  useEffect(() => {
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        setModalOpen(false);
        console.log(modalOpen);
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
      console.log(modalOpen);
    };
  }, [modalOpen, setModalOpen]);

  return createPortal(
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={() => {
          setModalOpen(false);
          console.log(modalOpen);
        }}
      ></div>
      <div className={styles.container}>
        <div className={styles.container__header}>
          {header && <h1 className="text text_type_main-large">{header}</h1>}
          <div
            className={styles.container__close}
            onClick={modalClose}
          >
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
