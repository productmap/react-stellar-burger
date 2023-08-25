import styles from "./modal-overlay.module.scss";
import PropTypes from "prop-types";

ModalOverlay.propTypes = {
  modalClose: PropTypes.func.isRequired,
};

export default function ModalOverlay({ modalClose }) {
  return <div className={styles.overlay} onClick={() => modalClose()}></div>;
}
