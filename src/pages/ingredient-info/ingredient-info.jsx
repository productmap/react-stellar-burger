import IngredientDetails from "../../components/ingredients/ingredient-details/ingredient-details";
import { useLocation } from "react-router-dom";
import Modal from "../../components/modal/modal";
import styles from "./ingredient-info.module.scss"

export default function IngredientInfo() {
  const location = useLocation();
  const background = !!location.state;

  return background ? (
    <Modal title="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  ) : (
    <section className={styles.section}>
      <IngredientDetails />
    </section>
  );
};
