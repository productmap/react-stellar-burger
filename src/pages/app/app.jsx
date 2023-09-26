import { DndProvider } from "react-dnd-multi-backend";
import Ingredients from "../../components/ingredients/ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useGetIngredientsQuery } from "../../store/api/burgers.api";
import { HTML5toTouch } from "../../utils/constants";
import styles from "./app.module.scss";

export default function App() {
  const {
    data: ingredients = [],
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetIngredientsQuery();

  return (
    <div className={styles.app}>
      {isError ? (
        <>Произошла ошибка: {error}</>
      ) : isLoading || isFetching ? (
        <>Загрузка...</>
      ) : ingredients ? (
            <DndProvider options={HTML5toTouch}>
              <Ingredients />
              <BurgerConstructor />
            </DndProvider>
      ) : null}
    </div>
  );
}
