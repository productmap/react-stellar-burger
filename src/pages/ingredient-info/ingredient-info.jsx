import IngredientDetails from "../../components/ingredients/ingredient-details/ingredient-details";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/modal/modal";
import styles from "./ingredient-info.module.scss"

export default function IngredientInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className={styles.section} >
      {location?.state?.background ? (
        <Modal
          header="Детали ингредиента"
          modalClose={() => {
            navigate(-1);
          }}
        >
          <IngredientDetails />
        </Modal>
      ) : (
        <IngredientDetails />
      )}
    </section>
  );
};
