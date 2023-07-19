import React from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor.scss";

const BurgerConstructor = ({ingredients, cart}) => {
  const bun = ingredients.find((el) => el.type === "bun");

  return (
    <>
      <ul className="burger-constructor__list">
        <li className="burger-constructor__pos pr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <ul className="burger-constructor__ingediaent-list custom-scroll">
          {cart.map((ingredient, idx) => {
            const pos = ingredients.find(
              (el) => el._id === ingredient && el.type !== "bun"
            );
            if (pos) {
              return (
                <li className="burger-constructor__pos pr-1" key={pos._id + idx}>
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
            return null
          })}
        </ul>
        <li className="burger-constructor__pos pr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <div className="burger-constructor__total">
        <p className="text text_type_digits-medium">
          610 <CurrencyIcon type="primary"/>
        </p>
        <Button htmlType="button" type="primary" size="large" extraClass="mr-4">
          Оформить заказ
        </Button>
      </div>
    </>
  );
};
export default BurgerConstructor;
