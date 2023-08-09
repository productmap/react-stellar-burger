import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
// import { ingredientPropType } from "../../utils/prop-types";
// import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";
import { Cart, Ingredients, OrderNumber } from "../../services/appContext";
import { orderBurger } from "../../utils/api";

// BurgerConstructor.propTypes = {
//   cart: PropTypes.arrayOf(PropTypes.string).isRequired,
//   ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
// };

export default function BurgerConstructor() {
  const { ingredients } = useContext(Ingredients);
  const { cart, setCart } = useContext(Cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const bun = ingredients.find((el) => el.type === "bun");
  const [modalOpen, setModalOpen] = React.useState(null);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      let currentItem = ingredients.find((el) => el._id === item.id);
      total += currentItem.price;
    });
    setTotalPrice(total);
  }, [ingredients, setTotalPrice, cart]);

  function handlerDeletePosition(uid) {
    const newCart = cart.filter((pos) => {
      return pos.uid !== uid;
    });
    setCart(newCart);
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
              (el) => el._id === ingredient.id && el.type !== "bun"
            );
            if (pos) {
              return (
                <li
                  className={`${styles.constructor__pos} pr-1`}
                  key={pos._id + idx}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={false}
                    text={pos.name}
                    price={pos.price}
                    thumbnail={pos.image}
                    handleClose={() => handlerDeletePosition(ingredient.uid)}
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
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="mr-4"
          onClick={() => {
            const cartSet = cart.map((i) => i.id);
            orderBurger({ ingredients: cartSet }).then((data) =>
              console.log(data)
            );
            // setModalOpen(true)
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {modalOpen && (
        <Modal
          modalClose={() => setModalOpen(false)}
          children={<OrderDetails />}
        />
      )}
    </>
  );
}
