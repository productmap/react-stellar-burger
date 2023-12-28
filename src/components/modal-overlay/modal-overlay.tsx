import styles from "./modal-overlay.module.scss";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type TProps = {
  modalClose?: () => void;
};

export default function ModalOverlay({ ...props }: TProps) {
  const navigate = useNavigate();
  const modalClose = useMemo(() => {
    return props.modalClose
      ? props.modalClose
      : () => {
          navigate(-1);
        };
  }, [navigate, props.modalClose]);

  return <div className={styles.overlay} onClick={() => modalClose()}></div>;
}
