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
  const [orderNumber, setOrderNumber] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const burgerBun = ingredients.find((el) => el.type === "bun");
  const burgerIngredients = cart.filter((el) => el.type !== "bun");
  const [modalOpen, setModalOpen] = useState(null);

  useEffect(() => {
    let total = cart.reduce((acc, el) => acc + el.price, 0);
    setTotalPrice(total);
  }, [setTotalPrice, cart]);

  function handlerDeletePosition(uid) {
    const newCart = cart.filter((pos) => {
      return pos.key !== uid;
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
                  handleClose={() => handlerDeletePosition(ingredient.key)}
                />
              </li>
            );
          })}
        </ul>
        <li className={`${styles.constructor__pos} pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerBun.name + " (низ)"}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
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
            const cartSet = cart.map((i) => i._id);
            orderBurger(cartSet).then((data) => {
              setOrderNumber(data.order.number);
            });
            setModalOpen(true);
          }}
        >
          Оформить заказ
        </Button>
      </div>
      {modalOpen && (
        <Modal modalClose={() => setModalOpen(false)}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}
