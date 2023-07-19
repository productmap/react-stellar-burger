import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import "./constructor.scss";

const Constructor = ({ ingredients, cart }) => {
  return (
    <main className="constructor pb-10">
      <div className="constructor__column">
        <BurgerIngredients ingredients={ingredients} />
      </div>
      <div className="constructor__column pt-25">
        <BurgerConstructor ingredients={ingredients} cart={cart} />
      </div>
    </main>
  );
};

export default Constructor;
