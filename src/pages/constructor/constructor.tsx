import { DndProvider } from "react-dnd-multi-backend";
import Ingredients from "../../components/ingredients/ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useGetIngredientsQuery } from "../../store/api/burgers.api";
import { HTML5toTouch } from "../../utils/constants";
import styles from "./constructor.module.scss";
import {Outlet} from "react-router-dom";

export default function Constructor() {
  const {
    data: ingredients = [],
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetIngredientsQuery(undefined);

  return (
    <div className={`${styles.constructor}`}>
      {isError ? (
        <>Произошла ошибка: {error}</>
      ) : isLoading || isFetching ? (
        <>Загрузка...</>
      ) : ingredients ? (
        <DndProvider options={HTML5toTouch}>
          <Ingredients />
          <BurgerConstructor />
          <Outlet />
        </DndProvider>
      ) : null}
    </div>
  );
}
