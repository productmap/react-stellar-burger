import { useMemo } from "react";
import styles from "./burger-details.module.scss";
import { useAppSelector } from "../../../hooks/hooks";
import { IIngredient } from "../../../utils/types";

type TProperty = {
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};

export default function BurgerDetails() {
  const { burger } = useAppSelector((store) => store.burger);

  const burgerIngredients = useMemo(() => {
    return [burger.bun, ...burger.ingredients, burger.bun].filter(
      (ingredient: IIngredient | null) => ingredient !== null && ingredient._id
    );
  }, [burger]);

  const useCalculateTotal = (property: keyof TProperty): number => {
    return useMemo(
      () =>
        burgerIngredients.reduce((acc, ingredient) => {
          if (ingredient !== null && typeof ingredient[property] === "number") {
            return acc + ingredient[property];
          }
          return acc;
        }, 0),
      [burgerIngredients, property]
    );
  };

  const totalCalories = useCalculateTotal("calories");
  const totalProteins = useCalculateTotal("proteins");
  const totalFat = useCalculateTotal("fat");
  const totalCarbohydrates = useCalculateTotal("carbohydrates");

  return (
    <ul className={styles.BurgerDetails}>
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
