import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./modal.module.scss";

Modal.propTypes = {
  modalClose: PropTypes.func.isRequired,
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default function Modal({ modalClose, header = null, children }) {
  // const location = useLocation();
  // console.log(location)

  useEffect(() => {
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        modalClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [modalClose]);

  // if (!location.state && location.state.background) {
  //   return children;
  // }

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay modalClose={modalClose} />
      <div className={styles.container}>
        <div className={styles.container__header}>
          {header && <h1 className="text text_type_main-large">{header}</h1>}
          <div className={styles.container__close} onClick={modalClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.querySelector("#modal")
  );
}
