import styles from "./ingredient-details.module.scss";
import {useParams} from "react-router-dom";
import {useGetIngredientsQuery} from "../../../store/api/burgers.api";
import {useEffect} from "react";
import {useSelector} from "react-redux";

// Ingredient.propTypes = {
//   ingredient: ingredientPropType.isRequired,
// };

export default function IngredientDetails() {
  const { id } = useParams();
  // const ingredients = useSelector(store => store.ingredients)
  const ingredients = useSelector(store => store.ingredients);
  console.log(ingredients)
  const ingredient = ingredients.filter(i => i.id === id)

  // useEffect(() => {
  //   return () => {
  //     const ingredient = ingredients.filter(i => i.id === id)
  //   };
  // }, [ingredients]);



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
          <p className="text text_type_main-default text_color_inactive pb-2">
            Калории,ккал
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.calories}
          </span>
        </li>
        <li className={styles.IngredientDetails__item}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Белки, г
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.proteins}
          </span>
        </li>
        <li className={styles.IngredientDetails__item}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Жиры, г
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.fat}
          </span>
        </li>
        <li className={styles.IngredientDetails__item}>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Углеводы, г
          </p>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}
