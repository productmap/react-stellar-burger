import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./modal.module.scss";

Modal.propTypes = {
  props: PropTypes.any,
};

export default function Modal({ ...props }) {
  const navigate = useNavigate();
  const title = props.title ? props.title : null;
  const subTitle = props.subTitle ? props.subTitle : null;

  const modalClose = useMemo(() => {
    return props.modalClose
      ? props.modalClose
      : () => {
        navigate(-1, { unstable_viewTransition: true });
        };
  }, [navigate, props.modalClose]);

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

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay modalClose={modalClose} />
      <div className={styles.container}>
        <div className={styles.container__header}>
          <div>
            {title && <h2 className="text text_type_main-large">{title}</h2>}
            {subTitle && (
              <p className="text text_type_main-large">{subTitle}</p>
            )}
          </div>
          <div className={styles.container__close} onClick={modalClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {props.children}
      </div>
    </div>,
    document.querySelector("#modal")
  );
}
