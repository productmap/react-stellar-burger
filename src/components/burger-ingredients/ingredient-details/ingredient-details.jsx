import styles from "./ingredient-details.module.scss";
import {ingredientPropType} from "../../../utils/prop-types";
import {Ingredient} from "../ingredient/ingredient";

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired
};

export default function IngredientDetails({ ingredient }) {
  return (
    <div>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.IngredientDetails__image}
      />
      <p
        className={`${styles.IngredientDetails__title} text text_type_main-medium pt-4`}
      >
        {ingredient.name}
      </p>
      <ul className={`${styles.IngredientDetails__list}`}>
        <li className={styles.IngredientDetails__item}>
          <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.calories}
          </span>
        </li>
        <li className={styles.IngredientDetails__item}>
          <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.proteins}
          </span>
        </li>
        <li className={styles.IngredientDetails__item}>
          <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.fat}
          </span>
        </li>
        <li className={styles.IngredientDetails__item}>
          <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}