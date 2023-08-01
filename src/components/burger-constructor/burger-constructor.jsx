import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";

BurgerConstructor.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default function BurgerConstructor({ingredients, cart, setIsModalOpen}) {
  const bun = ingredients.find((el) => el.type === "bun");

  function handlerOrderDetails(){
    setIsModalOpen(true);
    <Modal setModalOpen={setIsModalOpen} children={<OrderDetails/>} header={'fff'}/>
  }

  return (
    <>
      <ul className={styles.constructor__list}>
        <li className={`${styles.constructor__pos} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <ul className={`${styles.constructor__ingredients} custom-scroll`}>
          {cart.map((ingredient, idx) => {
            const pos = ingredients.find(
              (el) => el._id === ingredient && el.type !== "bun"
            );
            if (pos) {
              return (
                <li
                  className={`${styles.constructor__pos} pr-1`}
                  key={pos._id + idx}
                >
                  <DragIcon type="primary"/>
                  <ConstructorElement
                    isLocked={false}
                    text={pos.name}
                    price={pos.price}
                    thumbnail={pos.image}
                  />
                </li>
              );
            }
            return null;
          })}
        </ul>
        <li className={`${styles.constructor__pos} pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <div className={styles.constructor__total}>
        <p className={`text text_type_digits-medium`}>
          610 <CurrencyIcon type="primary"/>
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="mr-4"
          onClick={handlerOrderDetails}
        >
          Оформить заказ
        </Button>

      </div>
    </>
  );
}
