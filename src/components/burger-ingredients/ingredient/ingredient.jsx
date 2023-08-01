import React, {useCallback, useState} from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../../utils/prop-types";
import styles from "./ingredient.module.scss";
import Modal from "../../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";

// Ingredient.propTypes = {
//   ingredient: ingredientPropType.isRequired,
//   isModalOpen: PropTypes.bool.isRequired,
//   setIsModalOpen: PropTypes.bool.isRequired
// };

export function Ingredient({ ingredient }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = useCallback(() => setModalOpen(false), []);

  return (
    <div
      className={styles.ingredient}
      onClick={() => {
        setModalOpen(true);
      }}
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <p
        className={`${styles.ingredient__price} pt-2 pb-3 text text_type_digits-default`}
      >
        {ingredient.price} <CurrencyIcon type="primary" />
      </p>
      <span className={styles.ingredient__description}>{ingredient.name}</span>
      <Counter count={1} size="default" extraClass="m-1" />
      {modalOpen && (
        <Modal
          header="Детали ингредиента"
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          modalClose={handleModalClose}
        >
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
}
