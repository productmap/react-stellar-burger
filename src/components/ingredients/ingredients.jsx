import { useCallback, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsGroup } from "./ingredients-group/ingredients-group";
import IngredientDetails from "./ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useGetIngredientsQuery } from "../../store/api/burgers.api";
import { setCurrentIngredient } from "../../store/current-ingredient";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ingredients.module.scss";

export default function Ingredients() {
  const dispatch = useDispatch();
  const { data: ingredients } = useGetIngredientsQuery();
  const [currentGroup, setCurrentGroup] = useState("bun");
  const { currentIngredient } = useSelector((store) => store.currentIngredient);
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
        threshold: 0,
        rootMargin: "-50% 0% -50% 0%",
      }
    );

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
    <section>
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
              {...{ refCallback }}
            />
          );
        })}
      </div>
      {currentIngredient && (
        <Modal
          header="Детали ингредиента"
          modalClose={() => dispatch(setCurrentIngredient(null))}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
}
