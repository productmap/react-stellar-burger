import { useContext, useEffect, useState } from "react";
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
import { Cart, Ingredients } from "../../services/appContext";
import { orderBurger } from "../../utils/api";

// BurgerConstructor.propTypes = {
//   cart: PropTypes.arrayOf(PropTypes.string).isRequired,
//   ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
// };

export default function BurgerConstructor() {
  const { ingredients } = useContext(Ingredients);
  const { cart, setCart } = useContext(Cart);
  const [orderNumber, setOrderNumber] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const burgerBun = ingredients.find((el) => el.type === "bun");
  const burgerIngredients = cart.filter((el) => el.type !== "bun");

  useEffect(() => {
    let total = cart.reduce((acc, el) => acc + el.price, 0);
    setTotalPrice(total);
  }, [setTotalPrice, cart]);

  function handleDeleteIngredient(uid) {
    const newCart = cart.filter((ingredient) => {
      return ingredient.key !== uid;
    });
    setCart(newCart);
  }

  return (
    <>
      <ul className={styles.constructor__list}>
        {/* верхняя булка */}
        <li className={`${styles.constructor__pos} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={burgerBun.name + " (верх)"}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        </li>
        <ul className={`${styles.constructor__ingredients} custom-scroll`}>
          {burgerIngredients.map((ingredient) => {
            return (
              <li
                className={`${styles.constructor__pos} pr-1`}
                key={ingredient.key}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={() => handleDeleteIngredient(ingredient.key)}
                />
              </li>
            );
          })}
        </ul>
        {/* нижняя булка */}
        <li className={`${styles.constructor__pos} pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerBun.name + " (низ)"}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        </li>
        <li className={styles.constructor__total}>
          <p className={`text text_type_digits-medium`}>
            {totalPrice} <CurrencyIcon type="primary" />
          </p>
          <Button
              htmlType="button"
              type="primary"
              size="large"
              extraClass="mr-4"
              onClick={() => {
                const cartSet = cart.map((i) => i._id);
                orderBurger(cartSet).then((data) => {
                  setOrderNumber(data.order.number);
                });
              }}
          >
            Оформить заказ
          </Button>
        </li>
      </ul>
      {orderNumber && (
        <Modal modalClose={() => setOrderNumber(null)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}
