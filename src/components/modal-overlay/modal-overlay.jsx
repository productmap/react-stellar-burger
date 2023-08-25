import React, { useEffect } from "react";
import styles from "./modal-overlay.module.scss";
import PropTypes from "prop-types";

ModalOverlay.propTypes = {
  modalClose: PropTypes.func.isRequired,
};

export default function ModalOverlay({ modalClose }) {
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

  return <div className={styles.overlay} onClick={() => modalClose()}></div>;
}
