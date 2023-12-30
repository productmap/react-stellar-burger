import { ReactNode, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.scss";

type TProps = {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  modalClose?: () => void;
};

export default function Modal({ ...props }: TProps) {
  const navigate = useNavigate();
  const title = props.title || null;
  const subTitle = props.subTitle || null;

  const modalClose = useMemo(() => {
    return props.modalClose || (() => navigate(-1));
  }, [navigate, props.modalClose]);

  useEffect(() => {
    const handleEscapeClose = (event: KeyboardEvent) => {
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
    document.querySelector("#modal")!
  );
}
