import { Ingredient } from "../ingredient/ingredient";
import { ingredientPropType } from "../../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "./ingredients-group.module.scss";

IngredientsGroup.propTypes = {
  groupKey: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  showDetails: PropTypes.func.isRequired,
};

export function IngredientsGroup({
  groupKey,
  groupName,
  ingredients,
  showDetails,
  refCallback,
}) {
  return (
    <div className={`${styles.group} pb-10`} id={groupKey} ref={refCallback}>
      <h2 className={`${styles.group__header} pb-6`}>{groupName}</h2>
      <div className={`${styles.group__list} pr-4 pl-4`}>
        {ingredients.map((ingredient) => {
          if (ingredient.type === groupKey)
            return (
              <Ingredient
                ingredient={ingredient}
                key={ingredient._id}
                showDetails={showDetails}
              />
            );
          return null;
        })}
      </div>
    </div>
  );
}
