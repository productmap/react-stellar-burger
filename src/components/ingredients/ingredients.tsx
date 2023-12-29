import { RefCallback, useCallback, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsGroup } from "./ingredients-group/ingredients-group";
import { useGetIngredientsQuery } from "../../store/api/burgers.api";
import styles from "./ingredients.module.scss";

export default function Ingredients() {
  const { data: ingredients } = useGetIngredientsQuery(undefined);
  const [currentGroup, setCurrentGroup] = useState("bun");
  const ingredientsGroups = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const sectionsRef = useRef<HTMLElement[]>([]);

  function scrollToGroup(key: string) {
    document.getElementById(key)!.scrollIntoView();
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentGroup(entry.target.getAttribute("id") || "");
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

  const refCallback: RefCallback<HTMLElement> = useCallback((element) => {
    if (element) {
      sectionsRef.current.push(element);
    }
  }, []);

  return (
    <section>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        {Object.keys(ingredientsGroups).map((key) => {
          const ingredientsGroupType =
            ingredientsGroups[key as keyof typeof ingredientsGroups];
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
              {ingredientsGroupType}
            </Tab>
          );
        })}
      </div>
      <div className={`${styles.ingredients} itemList scroll-theme mt-10`}>
        {Object.keys(ingredientsGroups).map((key) => {
          const ingredientsType =
            ingredientsGroups[key as keyof typeof ingredientsGroups];
          return (
            <IngredientsGroup
              key={key}
              groupKey={key}
              groupName={ingredientsType}
              ingredients={ingredients}
              {...{ refCallback }}
            />
          );
        })}
      </div>
    </section>
  );
}
