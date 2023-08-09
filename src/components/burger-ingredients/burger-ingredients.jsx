import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsGroup } from "./ingredients-group/ingredients-group";
// import { ingredientPropType } from "../../utils/prop-types";
// import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.scss";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { Ingredients } from "../../services/appContext";

export default function BurgerIngredients() {
  const { ingredients } = useContext(Ingredients);
  const [currentGroup, setCurrentGroup] = useState("bun");
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const ingredientsGroups = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  const sectionsRef = useRef([]);

  function scrollToGroup(key) {
    document.getElementById(key).scrollIntoView();
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentGroup(entry.target.getAttribute("id"));
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    // const targetSections = document.querySelectorAll("section");
    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const refCallback = useCallback((element) => {
    if (element) {
      sectionsRef.current.push(element);
    }
  }, []);

  return (
    <>
      <h1 className={`text text_type_main-large pt-10 pb-5`}>
        Соберите бургер
      </h1>
      <div style={{ display: "flex" }}>
        {Object.keys(ingredientsGroups).map((key) => {
          return (
            <Tab
              value={key}
              active={currentGroup === key}
              onClick={() => {
                scrollToGroup(key);
                setCurrentGroup(key);
              }}
              key={key}
            >
              {ingredientsGroups[key]}
            </Tab>
          );
        })}
      </div>
      <div className={`${styles.ingredients} itemList custom-scroll mt-10`}>
        {Object.keys(ingredientsGroups).map((key) => {
          return (
            <IngredientsGroup
              key={key}
              groupKey={key}
              groupName={ingredientsGroups[key]}
              ingredients={ingredients}
              showDetails={setCurrentIngredient}
              {...{ refCallback }}
            />
          );
        })}
      </div>
      {currentIngredient && (
        <Modal
          header="Детали ингредиента"
          modalClose={() => setCurrentIngredient(false)}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </>
  );
}
