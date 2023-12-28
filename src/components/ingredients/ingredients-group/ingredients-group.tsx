import { Ingredient } from "../ingredient/ingredient";
import styles from "./ingredients-group.module.scss";
import { IIngredient } from "../../../utils/types";
import { LegacyRef } from "react";

type TIngredientsGroup = {
  groupKey: string;
  groupName: string;
  ingredients: ReadonlyArray<IIngredient>| undefined ;
  refCallback?: LegacyRef<HTMLDivElement>;
};

export function IngredientsGroup({
  groupKey,
  groupName,
  ingredients,
  refCallback,
}: TIngredientsGroup) {
  return (
    <div className={`${styles.group} pb-10`} id={groupKey} ref={refCallback}>
      <h2 className={`${styles.group__header} pb-6`}>{groupName}</h2>
      <div className={`${styles.group__list} pr-4 pl-4`}>
        {ingredients && ingredients.map((ingredient) => {
          if (ingredient.type === groupKey)
            return (
              <Ingredient
                ingredient={ingredient}
                key={ingredient._id}
                // showCopyIcon={true}
              />
            );
          return null;
        })}
      </div>
    </div>
  );
}
