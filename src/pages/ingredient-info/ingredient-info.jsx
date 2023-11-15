import IngredientDetails from "../../components/ingredients/ingredient-details/ingredient-details";
import styles from "./ingredient-info.module.scss"

export default function IngredientInfo() {
  return (
    <section className={styles.section}>
      <IngredientDetails />
    </section>
  );
};
