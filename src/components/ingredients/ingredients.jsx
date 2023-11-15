import { useCallback, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsGroup } from "./ingredients-group/ingredients-group";
import { useGetIngredientsQuery } from "../../store/api/burgers.api";
import styles from "./ingredients.module.scss";

export default function Ingredients() {
  const { data: ingredients } = useGetIngredientsQuery();
  const [currentGroup, setCurrentGroup] = useState("bun");
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
      <h1 className="text text_type_main-large pt-10 pb-5">
        Соберите бургер
      </h1>
      <div className={styles.tabs}>
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
      <div className={`${styles.ingredients} itemList scroll-theme mt-10`}>
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
    </section>
  );
}
