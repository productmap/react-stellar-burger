import { useSelector } from "react-redux";
import { useMemo } from "react";
import styles from "./burger-details.module.scss";

export default function BurgerDetails() {
  const { burger } = useSelector((store) => store.burger);
  const burgerIngredients = useMemo(() => {
    return [burger.bun, ...burger.ingredients, burger.bun].filter((i) => i._id);
  }, [burger]);

  const totalCalories = useMemo(
    () => burgerIngredients.reduce((acc, el) => acc + el.calories, 0),
    [burgerIngredients]
  );

  const totalProteins = useMemo(
    () => burgerIngredients.reduce((acc, el) => acc + el.proteins, 0),
    [burgerIngredients]
  );

  const totalFat = useMemo(
    () => burgerIngredients.reduce((acc, el) => acc + el.fat, 0),
    [burgerIngredients]
  );

  const totalCarbohydrates = useMemo(
    () => burgerIngredients.reduce((acc, el) => acc + el.carbohydrates, 0),
    [burgerIngredients]
  );

  return (
    <ul className={`${styles.BurgerDetails}`}>
      <li className={styles.BurgerDetails__item}>
        <p className="text text_type_main-small text_color_inactive pb-2">
          Калории,ккал
        </p>
        <span className={`text text_type_digits-default text_color_inactive`}>
          {totalCalories}
        </span>
      </li>
      <li className={styles.BurgerDetails__item}>
        <p className="text text_type_main-small text_color_inactive pb-2">
          Белки, г
        </p>
        <span className={`text text_type_digits-default text_color_inactive`}>
          {totalProteins}
        </span>
      </li>
      <li className={styles.BurgerDetails__item}>
        <p className="text text_type_main-small text_color_inactive pb-2">
          Жиры, г
        </p>
        <span className={`text text_type_digits-default text_color_inactive`}>
          {totalFat}
        </span>
      </li>
      <li className={styles.BurgerDetails__item}>
        <p className="text text_type_main-small text_color_inactive pb-2">
          Углеводы, г
        </p>
        <span className={`text text_type_digits-default text_color_inactive`}>
          {totalCarbohydrates}
        </span>
      </li>
    </ul>
  );
}
