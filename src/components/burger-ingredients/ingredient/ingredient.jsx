import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient.module.scss";
import PropTypes from "prop-types";

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
  showDetails: PropTypes.func.isRequired,
};

export function Ingredient({ ingredient, showDetails }) {
  return (
    <div className={styles.ingredient} onClick={() => showDetails(ingredient)}>
      <img src={ingredient.image} alt={ingredient.name} />
      <p
        className={`${styles.ingredient__price} pt-2 pb-3 text text_type_digits-default`}
      >
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <span className={styles.ingredient__description}>{ingredient.name}</span>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
}
